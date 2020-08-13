const fileUpload = require('express-fileupload'); 
const router = require('express').Router();

const moveFile = (file,path) => {
    file.mv(path, (err) => {
        throw err;
    })
};

router.post('/:path?', (req,res)=>{
    const files = res.files.documents;
    if(Array.isArray(files)){
        files.forEach(file => {
            moveFile(file, '/home/manuel1471/Escritorio/files');
        });
    }
    else{
        moveFile(files,'/home/manuel1471/Escritorio/files');
    }
    res.send({ message: 'Files successfully stored'});
});


module.exports = router;