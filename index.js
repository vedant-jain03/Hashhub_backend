const express = require('express')
const cors = require('cors')
const app = express();
const bodyparser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

app.use(cors())
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

require('./DB/connection')
app.use(require('./routings/auth'))
app.get('/',(req,res)=>{
    res.send("HaSHUB bACNED")
})
app.listen(process.env.PORT || 8000,()=>{
    console.log('Listing to Port')
})