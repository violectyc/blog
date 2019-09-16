const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GalleryDetailSchema = new Schema({
        GalleryId: {
            type: String,
            default: ''
        },
        Title: {
            type: String,
            default: ''
        },
        ImgList: {
            type: Array,
            default: [],
        },
        Description: {
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
module.exports = GalleryDetail = mongoose.model('GalleryDetail', GalleryDetailSchema);
