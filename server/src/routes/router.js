const fileUpload = require('express-fileupload'); 
const router = require('express').Router();

const moveFile = (file,path) => {
    file.mv(path, (err) => {
        throw err;
    })
};

router.post('/:path?', (req,res)=>{
    const files = res.files.documents;
    const path = '/home/manuel1471/Escritorio/files';
    if(Array.isArray(files)){
        files.forEach(file => {
            moveFile(file, path);
        });
    }
    else{
        moveFile(files,path);
    }
    res.send({ message: 'Files successfully stored'});
});


module.exports = router;