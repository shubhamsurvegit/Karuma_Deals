const mongoose=require('mongoose');

const car=mongoose.Schema({
    key:{
        type:mongoose.Schema.ObjectId,
        required:true 
    },
    cars_for_sale:[{
        brand:String,
        model: String,
        year: String,
        fuel_type:String,
        city: String,
        kms_driven:Number,
        selling_price:String,
        status:{
            type:Boolean,
            default:false
        },
        images:[
        ],
    }]   
})

const Cardata=mongoose.model('Cardata',car);

module.exports=Cardata