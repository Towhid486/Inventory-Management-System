const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
        UserEmail: {type:String, required:true},
        CustomerName: {type:String, required:true},
        Phone: {type:String, required:true, unique:true},
        Email: {type:String, required:true},
        Address: {type:String},
        CreateDate: {type:Date,default:Date.now()},
    },
    {versionKey:false}
)
const CustomersModel = mongoose.model('customers',DataSchema)
module.exports=CustomersModel;