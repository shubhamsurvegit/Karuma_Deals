const express=require('express')
const router=express.Router();
const sgmail=require('@sendgrid/mail')
require('dotenv').config();

sgmail.setApiKey(process.env.API_KEY)

router.post('/send-sms',async (req,res)=>{    
    const {name,contact,brand,model,email}=req.body
    const msg={
        to:email,
        from:{
            name:'KURUMA DEALS',
            email:"surveshubham10@gmail.com"
        },
        subject:"Car Deal",
        text:`${name} is intrested in buying your ${brand} , model ${model}.  Contact:${contact} `,
        html:`${name} is intrested in buying your ${brand} , model ${model}.  Contact:${contact} `
    }
    try{
        await sgmail.send(msg)
        return res.status(200).json({msg:"msg sent"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg:"Server error"})
    }
})

module.exports=router



// const twilio=require('twilio');

// const id="AC6df786a7f4437202a706c65102c21466"
// const token="2df5239007ddbdec3c72e145e9f16ebb"
// const client=new twilio(id,token)

 // client.messages.create({
    //     body:`${name} is intrested in buying your ${brand} ${model} model. Contact:${contact} `,
    //     to:'+919326998192',
    //     from:'+14159413834'
    // })
    // .then((msg)=>{
    //     res.json({msg:"msg sent"})
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })