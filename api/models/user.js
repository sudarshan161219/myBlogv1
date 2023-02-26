const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "must have name"],
        trim: true,
        unique: true,
        maxlength: [15, 'name can not be more than 15 characters']
    },

    password: {
        type: String,
        required: true,
    }

})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel