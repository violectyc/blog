const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {baseUrl} = require('../config');
const dirPath = path.join(__dirname, '..', 'public/images');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log('destination()', file)
        if (!fs.existsSync(dirPath)) {
            fs.mkdir(dirPath, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    cb(null, dirPath)
                }
            })
        } else {
            cb(null, dirPath)
        }
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + Math.floor(Math.random() * 100) + ext)
    }
})
const upload = multer({storage})
const uploadSingle = upload.single('image')

router.post('/', (req, res) => {
    uploadSingle(req, res, err => {
        if (err) {
            res.send({
                err_code: -1,
                message: '文件上传失败',
                name: '',
                filename: ''
            })
        }
        const file = req.file;
        const filename = file.filename;
        res.send({
            name: baseUrl + '/images/' + filename,
            filename: filename,
            err_code: 0,
            message: '文件上传成功'
        })
    });
});


router.post('/delte', (req, res) => {
    const {name} = req.body;
    fs.unlink(path.join(dirPath, name), (err) => {
        if (err) {
            console.log(err);
            res.send({
                status: 1,
                data: '删除文件失败'
            })
        } else {
            res.send({
                status: 0,
                data: '删除文件成功'
            })
        }
    })
})


module.exports = router;
