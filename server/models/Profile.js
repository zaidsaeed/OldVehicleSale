const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;


const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    posts: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    }


});

module.exports = Profile = mongoose.model('profile', ProfileSchema);