const mongoose = require('mongoose')

const CreateParentChilsdService = async (Request, ParentModel, ChildModel, JoinPropertyName) =>{

    // Create Transaction Session
    const session = await mongoose.startSession();

    try{

        // Begin Transaction
        await session.startTransaction();

        //First Database Process
        //Parent Creation
        let Parent = Request.body['Parent'];
        Parent.UserEmail = Request.headers['email'];
        let ParentCreation = await ParentModel.create([Parent],{session});

        //Second Database Process
        //Child Creation
        let Childs = Request.body['Childs'];

        await Childs.forEach((element)=>{
            element[JoinPropertyName] = ParentCreation[0]['_id'];
            element['UserEmail'] = Request.headers['email'];
        });
        let ChildsCreation = await ChildModel.insertMany(Childs,{session})

        //Transaction Success
        await session.commitTransaction();
        session.endSession()

        return {status:true, Parent:ParentCreation, Childs:ChildsCreation}

    }catch(e){
        // Roll Back Transaction if Fail
        await session.abortTransaction();
        session.endSession();
        return {status:false, data:e.toString()}
    }
}
module.exports=CreateParentChilsdService;