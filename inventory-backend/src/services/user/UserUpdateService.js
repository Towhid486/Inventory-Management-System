const UserUpdateService = async (Request,DataModel) => {
    try{
        let PostBody = Request.body;
        const data = await DataModel.updateOne({email:Request.headers?.email},PostBody)
        return {status:true, data:data}
    }catch (e) {
        return {status: false, message: e.message}
    }
}
module.exports = UserUpdateService;