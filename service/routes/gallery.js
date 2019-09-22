const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Gallery = require('../database/schema/GALLERY');
const {baseUrl} = require('../config');
/*获取列表*/
router.get('/list', async (req, res, next) => {
    try {
        let pageSize = 10;
        let currentPage = parseInt(req.query.currentPage) - 1;
        let skipPage = currentPage * pageSize;
        const result = await Gallery.find().skip(skipPage).limit(pageSize).sort({ReadCount: -1}).exec();
        if (result) {
            result.forEach(item => {
                if (item['CoverImg']) {
                    item['CoverImg'] = `${baseUrl}/images/${item['CoverImg']}`;
                }

            });
        }
        res.send({
            err_code: 0,
            data: result,
            message: 'success'
        });
    } catch (e) {
        console.log(e);
        res.send({
            err_code: -1,
            data: null,
            message: '请重试'
        });
    }
});
/*获取推荐*/
router.post('/recommend', async (req, res, next) => {
    try {
        const result = await Gallery.find().sort({ReadCount: -1}).exec();
        let target = result.length > 6 ? result.slice(0, 6) : result;
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
        const token = req.get('Authorization');
        const dcode = jwt.decode(token, {complete: true});
        const UserName = dcode.payload.data[0];
        gallery['UserName'] = UserName;
        console.log(gallery);
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

/*更新点赞数*/

router.get('/thumbCount', async (req, res, next) => {
    try {
        const {_id} = req.query;
        const result = await Gallery.findOneAndUpdate({_id: _id}, {$inc: {ThumbsUp: 1}}, {
            new: true,
            setDefaultsOnInsert: true
        }).exec();
        res.send({
            err_code: 0,
            data: {ThumbsUp: result['ThumbsUp']},
            message: '更新数据成功'
        });
    } catch (e) {
        res.send({
            err_code: -1,
            data: null,
            message: '更新数据失败'
        });
    }
});

router.get('/detailById', async (req, res, next) => {
    try {
        const {_id} = req.query;
        const result = await Gallery.findOne({_id: _id}).exec();
        if (result['ImgList']) {
            let temp = [];
            result['ImgList'].map(item => {
                temp.push(`${baseUrl}/images/${item}`);
            });
            result['ImgList'] = temp;
        }
        res.send({
            err_code: 0,
            data: result,
            message: 'success'
        });
    } catch (e) {
        res.send({
            err_code: -1,
            data: {},
            message: '请重试'
        });
    }
});

module.exports = router;
