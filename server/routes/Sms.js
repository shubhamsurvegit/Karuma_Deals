const express=require('express')
const router=express.Router();
const twilio=require('twilio');

const id="AC6df786a7f4437202a706c65102c21466"
const token="2df5239007ddbdec3c72e145e9f16ebb"
const client=new twilio(id,token)


router.post('/send-sms',(req,res)=>{    
    const {name,contact,brand,model}=req.body
    client.messages.create({
        body:`${name} is intrested in buying your ${brand} ${model} model. Contact:${contact} `,
        to:'+919326998192',
        from:'+14159413834'
    })
    .then((msg)=>{
        res.json({msg:"msg sent"})
    })
    .catch((err)=>{
        console.log("pro")
    })
})




module.exports=router
