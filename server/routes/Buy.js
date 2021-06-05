const express=require('express')
const mongoose=require('mongoose')
const router=express.Router();
const Cardata=require('../models/Cardata')
const auth=require('../middleware/auth');
const User = require('../models/Users');

router.get('/getcars',async (req,res)=>{  
    try{
        const cars=await Cardata.aggregate([
            {
                $lookup:{
                    from:'users',
                    localField:'key.str',
                    foreignField:'_id.str',
                    as:'seller_data'
                }
            },
            {$unwind : "$seller_data"}
        ])
        res.status(200).json({cars})
    }
    catch(err){
        console.log(err)
    }
})


module.exports=router;