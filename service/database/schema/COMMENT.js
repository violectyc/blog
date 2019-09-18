const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentsSchema = new Schema({
    ArticleId: {
        type: String,
        default: ''
    },
    UserName: {
        type: String,
        default: ''
    },
    Email: {
        type: String,
        default: ''
    },
    Content: {
        type: String,
        default: ''
    },
    Created: {
        type: Date,
        default: Date.now()
    },
    Avatar: {
        type: String,
        default: 'avatar/tx9.jpg'
    },
});
module.exports = Comments = mongoose.model('Comments', CommentsSchema);
