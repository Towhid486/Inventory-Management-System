const UserCreateService = async (req,DataModel) => {
    try{
        let PostBody = req.body;
        let email = req.body.email;
        let UserExist = await DataModel.findOne({email:email})
        if(UserExist){
            return {status:true, message:"User Already Exist"}
        }else{
            let data = await DataModel.create(PostBody)
            return {status:true, data:data}
        }

    }catch (e) {
        return {status: false, message: e.message}
    }
}
module.exports = UserCreateService;