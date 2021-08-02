const express=require('express');
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config();

const app=express();
app.use(cors())
app.use(express.json({limit:"50mb",extended:true})); //Used to parse JSON bodies
app.use(express.urlencoded({limit:"50mb",extended:true})); //Parse URL-encoded bodies


const url=process.env.DB_URL;


mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify: false })
.then(()=>console.log("mongo db connected"))
.catch((err)=>console.log(err));


app.get('/',async (req,res)=>{
    res.send("welcome to api")
})



app.use('/',require('./routes/users'))

app.use('/',require('./routes/Sell'))

app.use('/',require('./routes/Buy'))

app.use('/',require('./routes/Sms'))

app.use('/',require('./routes/Mydeals'))

app.listen(5000,()=>console.log('Server Running...'))