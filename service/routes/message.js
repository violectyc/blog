const express = require('express');
const router = express.Router();
const Message = require('../database/schema/MESSAGE');
const {baseUrl} = require('../config');
router.get('/', async (req, res, next) => {
    try {
        let pageSize = 5;
        let currentPage = parseInt(req.query.currentPage) - 1;
        let skipPage = currentPage * 5;
        let result = await Message.find().skip(skipPage).limit(pageSize).sort({Created: -1}).exec();
        let total = await Message.count();
        result.forEach(item => {
            item['Avatar'] = `${baseUrl}/${item['Avatar']}`
        });
        res.send({
            err_code: 0,
            data: result,
            message: '加载留言数据成功',
            total: total,
            currentPage: currentPage + 1
        });

    } catch (e) {
        res.send({
            err_code: -1,
            message: '获取数据失败'
        })
    }
});

router.post('/add', async (req, res, next) => {
    try {
        const msg = req.body;
        const Model = new Message(msg);
        await Model.save().then(d => {
            res.send({
                err_code: 0,
                message: '留言成功'
            })
        });

    } catch (e) {
        res.send({
            err_code: -1,
            message: '留言失败,请重试'
        })
    }
});
module.exports = router;
