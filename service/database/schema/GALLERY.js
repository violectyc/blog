const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GallerySchema = new Schema({
        GalleryId: {
            type: String,
            default: ''
        },
        UserId: {
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
        Created: {
            type: Date,
            default:
                Date.now()
        }
    })
;
module.exports = Gallery = mongoose.model('Gallery', GallerySchema);
