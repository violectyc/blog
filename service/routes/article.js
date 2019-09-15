const express = require('express');
const router = express.Router();
const Article = require('../database/schema/ARTICLE');
const jwt = require("jsonwebtoken");
const {baseUrl} = require('../config');
/*查询博客*/
router.post('/', async (req, res, next) => {
    try {
        let pageSize = 5;
        let currentPage = parseInt(req.body.currentPage) - 1;
        let skipPage = currentPage * 5;
        console.log(req.body.currentPage);
        const total = await Article.count();
        const result = await Article.find().skip(skipPage).limit(pageSize).sort({Created: -1}).exec();
        result.forEach(item => {
            item['ArticleImg'] = `${baseUrl}/images/${item['ArticleImg']}`;
        });
        res.send({
            err_code: 0,
            message: '',
            data: result,
            total: total
        });
    } catch (e) {
        res.send({
            err_code: -1,
            message: '加载数据失败，请重试',
            data: null
        });
    }
});

/* 添加博客 */
router.post('/add', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const dcode = jwt.decode(token, {complete: true});
        const UserId = dcode.payload.data[1];
        const {articleImg, content, description, origion, title, type} = req.body;
        const Model = new Article({
            Title: title,
            ArticleImg: articleImg,
            Description: description,
            Content: content,
            ArticleType: type,
            ArticleOrigion: origion,
            UserId: UserId
        });
        await Model.save().then(d => {
            res.send({
                err_code: 0,
                data: null,
                message: '文章保存成功'
            });
        });
    } catch (e) {
        res.send({
            err_code: -1,
            data: null,
            message: '文章保存失败，请重试'
        });
    }


});
router.get('/search', async (req, res, next) => {
    try {

        const {keyWord, currentPage} = req.query;
        let pageSize = 5;
        let currPage = parseInt(currentPage) - 1;
        let skipPage = currPage * 5;
        const reg = new RegExp(keyWord);
        const result = await Article.find({Title: {$regex: reg, $options: '$i'}}).skip(skipPage).limit(pageSize).exec();
        result.forEach(item => {
            item['ArticleImg'] = `${baseUrl}/images/${item['ArticleImg']}`;
        });
        const total = result.length;
        res.send({
            err_code: 0,
            data: result,
            total: total,
            message: ''
        });

    } catch (e) {
        res.send({
            err_code: -1,
            message: '服务错误请刷新重试'
        })
    }
});

module.exports = router;
