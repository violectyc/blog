const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const {key} = require('../config');
const User = require('../database/schema/USER');
/* GET users listing. */
router.get('/', async (req, res, next) => {

});
/*注册*/
router.post('/register', async (req, res, next) => {

    let {nickname, password, email, description} = req.body;
    const username = req.body.username;
    const secretOrPrivateKey = key;
    const Model = new User({
        UserName: username,
        NickName: nickname,
        Password: md5(password),
        Email: email,
        Description: description
    });
    await Model.save().then(d => {
        const token = jwt.sign({
            exp: Date.now() / 1000 + (60 * 60),
            data: [username, d['_id']]
        }, secretOrPrivateKey);
        res.send({
            err_code: 0,
            message: '注册成功',
            token: token
        });
    }).catch(e => {
        res.send({
            err_code: -1,
            message: '用户名已存在'
        });
    })
});
/*登陆*/
router.post('/login', async (req, res, next) => {
    try {
        const {password} = req.body;
        const username = req.body.username;
        let result = await User.findOne({UserName: username}).exec();
        const secretOrPrivateKey = key;
        const token = jwt.sign({
            exp: Date.now() / 1000 + 60*1,
            data: [username, result['_id']]
        }, secretOrPrivateKey);
        if (result['Password'] != md5(password)) {
            res.send({
                err_code: -1,
                message: '密码错误'
            })
        } else {
            res.send({
                err_code: 0,
                message: '登录成功',
                token: token
            })
        }
    } catch (e) {
        res.send({
            err_code: -1,
            message: '用户名不存在'
        })
    }
});
/*获取当前登陆用户信息*/
router.post('/current', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const dcode = jwt.decode(token, {complete: true});
        const username = dcode.payload.data[0];
        console.log(username);
        const result = await User.findOne({UserName: username}, {Password: 0}).exec();
        result['Avatar'] = `http://localhost:3000/images/${result['Avatar']}`
        res.send({
            err_code: 0,
            data: result,
            message: '获取登录用户成功'
        });
    } catch (e) {
        res.send({
            err_code: -1,
            message: '获取登录用户失败'
        });
    }
});
/*更新登陆用户信息*/
router.post('/update', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const dcode = jwt.decode(token, {complete: true});
        const id = dcode.payload.data[1];
        const {username, nickname, password, email, description, avatar} = req.body;
        const Model = {
            UserName: username,
            NickName: nickname,
            Email: email,
            Description: description,
            Avatar: avatar
        };
        if (password !== '') {
            Model['Password'] = md5(password)
        }
        await User.findByIdAndUpdate(id, Model).then(doc => {
            res.send({
                err_code: 0,
                data: '',
                message: '更新成功'
            });
        });


    } catch (e) {
        console.log(e);
    }
});


module.exports = router;
