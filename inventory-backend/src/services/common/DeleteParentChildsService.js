const mongoose = require('mongoose')

const DeleteParentChildsService = async (Request,ParentModel,ChildModel,JoinPropertyName) => {

    const session = await mongoose.startSession();

    try{

        // Begin Transaction
        await session.startTransaction();

        //Parent Creation
        let DeleteID = Request.params.id;
        let UserEmail = Request.headers['email'];

        let ChildQueryObject = {};
        ChildQueryObject[JoinPropertyName] = DeleteID;
        ChildQueryObject['UserEmail'] = UserEmail;

        let ParentQueryObject = {};
        ParentQueryObject['_id'] = DeleteID;
        ParentQueryObject['UserEmail'] = UserEmail;

        // First Process
        let ChildsDelete = await ChildModel.deleteMany(ChildQueryObject).session(session);

        // Second Process
        let ParentDelete = await ParentModel.deleteOne(ParentQueryObject).session(session);

        // Commit Transaction
        await session.commitTransaction();
        session.endSession()

        return {status:true, Parent:ParentDelete, Child:ChildsDelete}
        
    }catch (e) {
        await session.abortTransaction();
        session.endSession();
        return {status:false, message:e.toString()}
    }
}
module.exports=DeleteParentChildsService;