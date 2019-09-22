const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GallerySchema = new Schema({
        UserId: {
            type: String,
            default: ''
        },
        UserName: {
            type: String,
            default: ''
        },
        Title: {
            type: String,
            default: ''
        },
        CoverImg: {
            type: String,
            default: '',
        },
        Description: {
            type: String,
            default: ''
        },
        ImgList: {
            type: Array,
            default: [],
        },
        ReadCount: {
            type: Number,
            default: 1
        },
        ThumbsUp: {
            type: Number,
            default: 1
        },
        Created: {
            type: Date,
            default:
                Date.now()
        }
    })
;
module.exports = Gallery = mongoose.model('Gallery', GallerySchema);
