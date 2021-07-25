const express=require('express');
const mongoose=require('mongoose')
const router=express.Router();
const Cardata=require('../models/Cardata')
const auth=require('../middleware/auth')

router.get('/mydeals',auth,async (req,res)=>{
    try{
        const cardata=await Cardata.findOne({key:req.UserId})
        if(!cardata){
            return res.status(200).json({result:{key:req.UserId,cars_for_sale:[]}})
        }
        return res.status(200).json({result:cardata})
    }
    catch(err){
        return res.status(500).json({message:"Internal Server Issue"})
    }
})


router.post('/soldcar',auth,async (req,res)=>{
    try{
        const Car=await Cardata.findOne({key:req.UserId})
        if(!Car){
            return res.status(400).json({message:"User not Found"})
        }
        Car.cars_for_sale.forEach((car)=>{
            if(car._id==req.body.id){
                car.status=true
            }
        })
        await Car.save()
        return res.status(200).json({result:Car})
    }
    catch(err){
        return res.status(200).json({message:"Intener Server Error"})
    }
})

router.post('/removedeal',auth,async (req,res)=>{
    try{
        const Car=await Cardata.findOne({key:req.UserId})
        if(!Car){
            return res.status(400).json({message:"User not Found"})
        }
        const filterarray=Car.cars_for_sale.filter((car)=>car._id!=req.body.id)
        Car.cars_for_sale=filterarray
        await Car.save();
        return res.status(200).json({result:Car})
    }
    catch(err){
        return res.status(200).json({message:"Intener Server Error"})
    }
})


module.exports=router
