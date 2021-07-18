const express = require('express')
const router = express.Router();
const User = require('../models and Schema/user')
const bcrypt = require('bcryptjs')
const UserContact = require('../models and Schema/contact')
const NewBlog = require('../models and Schema/Blog')


// Registeration
router.post('/register', async (req, res) => {
    try {
        let { name, email, interest, password, cpassword } = req.body;
        if (!name || !email || !interest || !password || !cpassword) {
            return res.status(400).json({ message: 'Empty Input Fields' });
        }
        if (password !== cpassword) {
            return res.status(400).json({ message: 'Password not match' })
        }
        try {
            const userexist = await User.findOne({ email: email })
            if (userexist) {
                return res.status(500).json({ message: 'User Already Exist!!' })
            }
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            cpassword = await bcrypt.hash(cpassword, salt);
            const user = await new User({ name, email, interest, password, cpassword })
            const userRegister = await user.save();
            if (userRegister) {
                res.status(200).json({ message: 'User Registered Succesfully!!!' })
            } else {
                res.status(400).json({ message: 'Something Went Wrong' })
            }
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
})


//Login Routing
router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        const userexist = await User.findOne({ email: email });
        if (!userexist) {
            return res.status(500).json({ message: "User not Registered!!!" });
        }
        const userpassword = await bcrypt.compare(password, userexist.password);
        if (!userpassword) {
            return res.status(500).json({ message: "Invalid Credentials!!!" });
        }
        res.status(200).json({ user: userexist });
    } catch (err) {
        console.log(err);
    }
})

// Contact Routing
router.post('/contact', async (req, res) => {
    try {
        let { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(500).json({ message: "Empty Inputs" });
        }
        const user = await new UserContact({ name, email, message });
        const result = await user.save();
        if (!result) {
            return res.status(400).json({ message: "Something Went Wrong" });
        }
        res.status(200).json({ message: "Query Recieved , Thankyou !!" })
    } catch (err) {
        console.log(err);
    }
})

// File Uploadation
router.post('/createBlog', async (req, res) => {
    try {
        const newBlog = await new NewBlog({
            email: req.body.email,
            name: req.body.name,
            CoverImage: req.body.CoverImage,
            heading: req.body.heading,
            tags: req.body.tags,
            content: req.body.content,
            likes: 0,
            dislikes: 0
        })
        const result = await newBlog.save();
        if (!result) {
            res.status(500).json({ message: "Something Went Wrong" });
        }
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
})

// Blogs
router.get('/Hashhub_blogs',async(req, res) => {
    try {
        const result = await NewBlog.find({});
        res.status(200).json(result);
    }catch(err){
        console.log(err);
    }
}
)

// Like 
router.patch('/likethisBlog',async(req,res)=>{
    try{
        const {_id} = req.body;
        const result = await NewBlog.findByIdAndUpdate(_id,req.body,{new:true});
        res.status(200).json(result);
    }catch(err){
        console.log(err);
    }
})

// Get My Blogs
router.post('/getmyblogs',async(req,res)=>{
    try{
        const {email} = req.body;
        const result = await NewBlog.find({email:email});
        res.status(200).json(result);
    }catch(err){
        console.log(err);
    }
})

router.delete('/deletethispost',async(req,res)=>{
    try{
        const result = await NewBlog.findByIdAndDelete(req.body);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;