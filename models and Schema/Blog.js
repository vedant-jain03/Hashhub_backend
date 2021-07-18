const mongoose  = require('mongoose');

const newblog = new mongoose.Schema({
    email:{
        type: String,
    },
    name: {
        type: String,
    },
    CoverImage : {
        type: String
    },
    heading: {
        type: String,
    },
    tags: [String],
    content: {
        type: String,
    },
    likes: {
        type: Number
    },
    dislikes: {
        type: Number
    }
})

const NewBlog  = mongoose.model("BLOG_POST",newblog);
module.exports = NewBlog;