const router = require('express').Router();
const fs = require('fs');
const processPath = require('../functions/path');

router.get('/:path?',async(req,res,next) => {
  try{
    const directPath = processPath(req.params.path);
    const dir = await fs.promises.opendir(directPath.absolutePath);
    const content = { files: [],directories: [] }

    for await (const direct of dir){
      if(direct.isDirectory()){
	content.directories.push(direct.name);
      }
      else{
	content.files.push(direct.name)
      }
    }
    content.directories.sort();
    content.files.sort();

    res.json({ path:directPath.relativePath, content, sucess: true });
  }
  catch(err){
    next(err);
  }
});

module.exports = router;
