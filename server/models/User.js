const {Schema, model, ObjectId} = require('mongoose')

const User = new Schema(
    {
        firstName: {type: String, required: true, trim: true, minlength: 2},
        lastName: {type: String, required: true, trim: true, minlength: 2},
        position: {type: String, required: true},
        gender: {type: String, required: true},
        dateOfBirth: {type: Date, required: true},
        profilePicture: {type:String, required: true}
    },
    {timestamps: true},
)
module.exports = model('users', User)