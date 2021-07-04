const express=require('express');
const mongoose=require('mongoose')
const router=express.Router();
const bcrypt=require('bcryptjs')
const User=require('../models/Users')
const jwt=require('jsonwebtoken')

router.post('/login',async (req,res)=>{
    const {phone,password}=req.body;
    try{
        const existingUser=await User.findOne({phone:phone})
        if(!existingUser){
            return res.status(404).json({message:"User does not exist"})
        }
        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Password Incorrect"})
        }
        const token=jwt.sign({phone:existingUser.phone,id:existingUser._id},'test',{
            expiresIn:'1h'
        })
        return res.status(200).json({result:existingUser,token:token,msg:'User logged In'})
    }
    catch(err){
        return res.status(500).json({message:err})        
    }
})

router.post('/register',async(req,res)=>{
    const {name,phone,password}=req.body;
    try{
        const existingUser=await User.findOne({phone:phone})
        if(existingUser){
            return res.status(404).json({message:"User already exists"})    
        }
        const hashedPassword=await bcrypt.hash(password,12)
        const newUser=await User.create({name,phone,password:hashedPassword})
        const token=jwt.sign({phone:newUser.phone,id:newUser._id},'test',{expiresIn:'1h'})
        return res.status(200).json({result:newUser,token:token,msg:'User Signed Up'})
    }
    catch(err){
        return res.status(500).json({message:err})      
    }
})



module.exports=router