const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
        UserEmail:{type:String},
        CategoryID:{type:mongoose.Schema.Types.ObjectId,required:true},
        BrandID:{type:mongoose.Schema.Types.ObjectId,required:true},
        Name:{type:String,required:true},
        Price:{type:Number,required:true},
        Unit:{type:String},
        Details:{type:String,required:true},
        CreatedDate:{type:Date,default:Date.now()}
    },
    {versionKey:false}
)
const ProductsModel = mongoose.model('products',DataSchema);
module.exports=ProductsModel;