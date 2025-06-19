const mongoose = require('mongoose')

const DetailsByIDService = async (Request, DataModel) => {
    try{
        
        let DetailsID = Request.params.id;
        let UserEmail = Request.headers['email'];

        const ObjectID = mongoose.Types.ObjectId;
        let QueryObject = {}
        QueryObject['_id'] = new ObjectID(DetailsID)
        QueryObject['UserEmail'] = UserEmail;

        let data = await DataModel.aggregate([
            {$match: QueryObject}
        ])
        return {status:true, data:data}
    }
    catch (e) {
        return {status:false, data:e.toString()}
    }
}
module.exports=DetailsByIDService;