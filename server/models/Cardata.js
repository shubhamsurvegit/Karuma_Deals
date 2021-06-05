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
        ownership:String,
        city: String,
        price: Number,
        selling_price: Number,
        images:[
        ],
        contact:Number
    }]   
})

const Cardata=mongoose.model('Cardata',car);

module.exports=Cardata