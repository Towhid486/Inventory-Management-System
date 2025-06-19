const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
        UserEmail:{type:String},
        PurchaseID:{type:mongoose.Schema.Types.ObjectId,required:true},
        ProductID:{type:mongoose.Schema.Types.ObjectId,required:true},
        Qty:{type:Number},
        UnitCost:{type:Number},
        Total:{type:Number},
        CreatedDate:{type:Date,default:Date.now()}
    },
    {versionKey:false}
)
const PurchaseProductModel = mongoose.model('purchaseproducts',DataSchema);
module.exports=PurchaseProductModel;