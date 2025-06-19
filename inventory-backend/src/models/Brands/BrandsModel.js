const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    UserEmail: {type:String, required:true},
    Name: {type:String, required:true, unique:true},
    CreateDate: {type:Date,default:Date.now()},
},
    {versionKey:false}
)
const BrandsModel = mongoose.model('brands',DataSchema)
module.exports=BrandsModel;