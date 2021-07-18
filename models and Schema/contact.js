const mongoose = require('mongoose')

const contact = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required : true
    },
    message: {
        type: String,
        required : true
    }
})

const UserContact = new mongoose.model('CONTACT_QUERY',contact);
module.exports = UserContact;