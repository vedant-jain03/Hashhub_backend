const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    interest: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    }
})

const User = mongoose.model('REGISTERED_USER',userSchema);
module.exports = User;