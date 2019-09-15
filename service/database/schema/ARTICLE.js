const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const ArticleSchema = new Schema({
        ArticleId: {
            type: ObjectId
        },
        UserId: {
            type: String,
            default: ''
        },
        Title: {
            type: String,
            default: ''
        },
        ArticleImg: {
            type: String,
            default: '',
        },
        Description: {
            type: String,
            default: ''
        },
        Content: {
            type: String,
            default: ''
        },
        ArticleType: {
            type: Array,
            default: []
        },
        ArticleOrigion: {
            type: String,
            default: ''
        },
        Created: {
            type: Date,
            default:
                Date.now()
        }
    })
;
module.exports = Article = mongoose.model('Article', ArticleSchema);
