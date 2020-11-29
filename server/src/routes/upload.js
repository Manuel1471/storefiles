const fileUpload = require('express-fileupload'); 
const router = require('express').Router();
const processPath = require('../functions/path');
const moveFile = require('../functions/move.js')

router.use(fileUpload());

router.post('/:path?', async(req,res,next)=>{
    console.log(req.files);
    if(!req.files){
      return res.status(400).json({
	success: false,
	message: 'No files were upload'
      });
    }
    const directPath = processPath(req.params.path);
    let files = req.files.file;
    if(!Array.isArray(files)){
      files = [files];
    }

    try {
      for (const file of files){
	await moveFile(file,directPath.absolutePath);
      }
    }catch(err){
      if (err.code){
	return next(err)
      }

      return res.status(400).json({
	success: false,
	message: err.message,
	path: directPath.relativePath
      });
    }
    return res.status(400).json({
      success: true,
      message: 'Files successfully uploaded'
    });
});

module.exports = router;
