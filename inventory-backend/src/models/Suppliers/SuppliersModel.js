const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
        UserEmail: {type:String, required:true},
        SupplierName: {type:String, required:true},
        Phone: {type:String, required:true, unique:true},
        Email: {type:String, required:true},
        Address: {type:String},
        CreateDate: {type:Date,default:Date.now()},
    },
    {versionKey:false}
)
const SuppliersModel = mongoose.model('suppliers',DataSchema)
module.exports=SuppliersModel;