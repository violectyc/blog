const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.send({
            err_code: 0,
            data: '',
            message: 'success'
        })
    } catch (e) {

    }
});


module.exports = router;
