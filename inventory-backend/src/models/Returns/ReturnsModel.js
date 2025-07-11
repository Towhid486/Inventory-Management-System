const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
        UserEmail:{type:String},
        CustomerID:{type:mongoose.Schema.Types.ObjectId,required:true},
        VatTax:{type:Number},
        Discount:{type:Number},
        OtherCost:{type:Number},
        ShippingCost:{type:Number},
        GrandTotal:{type:Number},
        Note:{type:String},
        CreatedDate:{type:Date,default:Date.now()}
    },
    {versionKey:false}
)
const ReturnsModel = mongoose.model('returns',DataSchema);
module.exports=ReturnsModel;