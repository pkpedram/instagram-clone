const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'basic'
    },
    fullName: String,
    phoneNumber: String,
    bio: String,
    email: {
        type: String,
    },
    avatar: String,
    posts: Number,
    followers: Number,
    following: Number,
})

const User = mongoose.model('User', userSchema);

module.exports = User