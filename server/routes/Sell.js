const express=require('express');
const mongoose=require('mongoose')
const router=express.Router();
const Cardata=require('../models/Cardata')
const auth=require('../middleware/auth')

router.post('/sell',auth,async (req,res)=>{
    const existing_data=await Cardata.findOne({key:req.UserId});
    if(!existing_data){ 
        const cardata={
            key:req.UserId,
            cars_for_sale:[req.body]
        }
        Cardata.create(cardata)
        .then((result)=>{
            return res.status(200).json({result:result,msg:"Car Listed"})
        })
        .catch((err)=>console.log(err))
    }
    else{
        Cardata.findOneAndUpdate({key:req.UserId},{
            $push:{cars_for_sale:req.body}
        })
        .then((result)=>{
            return res.status(200).json({result:result,msg:"Car Listed"})
        })
        .catch((err)=>console.log(err))
    }
})

module.exports=router