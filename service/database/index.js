const mongoose = require('mongoose');
const {db} = require('../config');
mongoose.set('useFindAndModify', false);
function conn() {
    mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
}

module.exports = conn;
