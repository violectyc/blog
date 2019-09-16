const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const messageRouter = require('./routes/message');
const uploadRouter = require('./routes/upload');
const articleRouter = require('./routes/article');
const galleryRouter = require('./routes/gallery');
const {key} = require('./config');
const app = express();
app.use(cors());
/*check token*/
app.use(function (req, res, next) {
    console.log(req.originalUrl);
    const url = req.originalUrl;
    if (url == '/user/current') {
        const token = req.get('Authorization');
        jwt.verify(token, key, (err, decode) => {
            if (err) {
                res.status(401).send({
                    err_code: -2,
                    message: '身份识别过期,请重新登陆'
                });
            } else {
                console.log('token验证中');
                next();
            }
        });
    } else {
        next();
        console.log('无需验证token');
    }
});
app.use(logger('dev'));
app.use(express.json({limit: '100000kb'}));
app.use(express.urlencoded({extended: false, limit: '100000kb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/message', messageRouter);
app.use('/upload', uploadRouter);
app.use('/article', articleRouter);
app.use('/agllery', galleryRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
