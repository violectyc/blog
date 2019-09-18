const express = require('express');
const router = express.Router();
const Comments = require('../database/schema/COMMENT');
const {baseUrl} = require('../config');

/*获取评论*/
router.get('/', async (req, res, next) => {
    try {
        const {ArticleId} = req.query;
        const result = await Comments.find({ArticleId: ArticleId}).sort({Created:-1}).exec();
        result.forEach(item => {
            item['Avatar'] = `${baseUrl}/${item['Avatar']}`;
        });
        res.send({
            err_code: 0,
            data: result,
            message: '更新评论成功'
        });
    } catch (e) {
        res.send({
            err_code: -1,
            data: null,
            message: '请刷新,重试'
        })
    }
});

/*添加评论*/
router.post('/add', async (req, res, next) => {
    try {
        const comment = req.body;
        const Model = new Comments(comment);
        await Model.save().then(doc => {
            res.send({
                err_code: 0,
                data: doc,
                message: '留言成功'
            })
        });

    } catch (e) {

        res.send({
            err_code: -1,
            data: null,
            message: '请刷新,重试'
        })
    }

});

module.exports = router;
