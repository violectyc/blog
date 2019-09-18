const express = require('express');
const router = express.Router();
const Article = require('../database/schema/ARTICLE');
const User = require('../database/schema/USER');
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
        const result = await Article.find({}, {Content: 0}).skip(skipPage).limit(pageSize).sort({Created: -1}).exec();
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
/*博客详情*/
router.get('/detail', async (req, res, next) => {
    try {
        let {_id, UserId} = req.query;
        let article = await Article.findOne({_id: _id}).exec();

        let nick = await User.findOne({UserId: UserId}, {NickName: 1, _id: 0}).exec();
        res.send({
            err_code: 0,
            data: article,
            nick: nick,
            message: '获取数据成功'
        });
    } catch (e) {
        res.send({
            err_code: -1,
            data: null,
            message: '请刷新重试'
        });
    }
});
/*已读人数*/
router.get('/readCount', async (req, res, next) => {
    try {
        let {_id} = req.query;
        let result = await Article.findOneAndUpdate({_id: _id}, {$inc: {ReadCount: 1}}, {
            new: true,
            setDefaultsOnInsert: true
        }).exec();
        res.send({
            err_code: 0,
            data: {ReadCount: result['ReadCount']},
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
/*点赞数*/
router.get('/thumbCount', async (req, res, next) => {
    try {
        let {_id} = req.query;
        let result = await Article.findOneAndUpdate({_id: _id}, {$inc: {ThumbsUp: 1}}, {
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
/*博客搜索*/
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
/*获取推荐博客*/
router.get('/recommend', async (req, res, next) => {
    try {
        // let {_id, UserId} = req.query;
        let temp = await Article.find({}, {Content: 0}).sort({ReadCount: -1}).exec();
        let result = temp.length >= 8 ? temp.slice(0, 8) : temp;
        res.send({
            err_code: 0,
            data: result,
            message: '获取推荐博客成功'
        });
    } catch (e) {
        res.send({
            err_code: -1,
            data: null,
            message: '获取推荐博客失败'
        });
    }
});
module.exports = router;
