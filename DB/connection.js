const mongoose = require('mongoose')

const DB = process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    try{
        console.log('Connected to Database')
    }catch(err){
        console.log(err);
    }
})