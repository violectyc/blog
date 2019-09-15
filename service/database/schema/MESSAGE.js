const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const MessageSchema = new Schema({
        UserId: {
            type: ObjectId
        },
        UserName: {
            type: String,
            default: ''
        },
        Email: {
            type: String,
            default: '',
        },
        Avatar: {
            type: String,
            default: 'avatar/tx9.jpg'
        },
        Content: {
            type: String,
            default: '好久不见'
        }
        ,
        Created: {
            type: Date,
            default:
                Date.now()
        }
    })
;
module.exports = Message = mongoose.model('Message', MessageSchema);
