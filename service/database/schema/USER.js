const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
        UserName: {
            unique: true,
            type: String,
            default: ''
        },
        NickName: {
            type: String,
            default: 'violet'
        },
        Password: {
            type: String,
            default: '123456'
        },
        Email: {
            type: String,
            default: '',
            get(val) {
                console.log(val);
                return 456 + val;
            }
        },
        Avatar: {
            type: String,
            default: 'images/avatar.jpeg',
            get(val) {
                return val;
            }
        },
        Description: {
            type: String,
            default: '好久不见'
        }
        ,
        Created: {
            type: Date,
            default:
                Date.now()
        }
        ,
        Updated: {
            type: Date,
            default:
                Date.now()
        }
    })
;
module.exports = User = mongoose.model('User', UserSchema);
