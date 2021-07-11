const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        firstName: {type: String, required: true, trim: true, minlength: 2},
        lastName: {type: String, required: true, unique: true, trim: true, minlength: 2},
        position: {type: String, required: true},
        gender: {type: String, required: true},
        dateOfBirth: {type: Date, required: true},
        profilePicture: {type: String},
    },
    {timestamps: true},
)

module.exports = mongoose.model('users', User)