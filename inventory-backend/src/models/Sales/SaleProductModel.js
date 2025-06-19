const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
        UserEmail:{type:String},
        SaleID:{type:mongoose.Schema.Types.ObjectId,required:true},
        ProductID:{type:mongoose.Schema.Types.ObjectId,required:true},
        Qty:{type:Number},
        UnitCost:{type:Number},
        Total:{type:Number},
        CreatedDate:{type:Date,default:Date.now()}
    },
    {versionKey:false}
)
const SaleProductModel = mongoose.model('saleproducts',DataSchema);
module.exports=SaleProductModel;