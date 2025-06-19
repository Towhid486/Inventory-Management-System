const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    UserEmail: {type:String, required:true},
    Name: {type:String, required:true, unique:true},
    CreateDate: {type:Date,default:Date.now()},
},
    {versionKey:false}
)
const CategoriesModel = mongoose.model('categories',DataSchema)
module.exports=CategoriesModel;