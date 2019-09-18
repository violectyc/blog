const express = require('express');
const router = express.Router();
const Gallery = require('../database/schema/GALLERY');
const {baseUrl} = require('../config');
router.post('/recommend', async (req, res, next) => {
    try {
        const result = await Gallery.find().sort({ReadCount: -1}).exec();

        let target = result.length > 6 ? result.slice(0, 7) : result;
        target.forEach(item => {
            if (item['CoverImg']) {
                item['CoverImg'] = `${baseUrl}/images/${item['CoverImg']}`;
            }
            if (item['ImgList']) {
                let temp = [];
                item['ImgList'].forEach(ele => {
                    temp.push(`${baseUrl}/images/${ele}`);
                });
                item['ImgList'] = temp;
            }

        });
        res.send({
            err_code: 0,
            data: target,
            message: ''
        });
    } catch (e) {
        res.send({
            err_code: -1,
            data: null,
            message: '未知错误，请刷新重试'
        });
    }
});


/*添加相册*/
router.post('/put', async (req, res, next) => {
    try {
        const gallery = req.body;
        const Model = new Gallery(gallery);
        await Model.save().then(d => {
            res.send({
                err_code: 0,
                data: d,
                message: '保存成功'
            });
        });

    } catch (e) {

        res.send({
            err_code: -1,
            data: null,
            message: '未知错误，请刷新重试'
        });
    }
});


module.exports = router;
