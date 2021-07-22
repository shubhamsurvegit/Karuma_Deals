const express=require('express');
const mongoose=require('mongoose')
const cors=require('cors')

const app=express();
app.use(cors())
app.use(express.json({limit:"50mb",extended:true})); //Used to parse JSON bodies
app.use(express.urlencoded({limit:"50mb",extended:true})); //Parse URL-encoded bodies

const brands=require('../apis/brand');

const url="mongodb://localhost:27017/cars";

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify: false })
.then(()=>console.log("mongo db connected"))
.catch((err)=>console.log(err));


app.get('/',async (req,res)=>{
    res.send("gi")
})



app.get('/getbrands', (req,res)=>{
    // const response = await fetch('https://private-anon-1b63ad57f5-carsapi1.apiary-mock.com/manufacturers');
    //   const data = await response.json(); // Here you have the data that you need
    //   console.log(JSON.stringify(data, null, 2));
    //   res.send(data)
    const brand_name=brands.map(brand=>brand.name)
    res.status(200).json(brand_name)
})

app.use('/',require('./routes/users'))

app.use('/',require('./routes/Sell'))

app.use('/',require('./routes/Buy'))

app.use('/',require('./routes/Sms'))

app.use('/',require('./routes/Mydeals'))

app.listen(5000,()=>console.log('Server Running...'))