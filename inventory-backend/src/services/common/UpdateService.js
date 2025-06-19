const UpdateService = async (Request,DataModel) => {
    try{
        let UserEmail = Request.headers['email'];
        let id = Request.params.id;
        let PostBody = Request.body;
        let data = await DataModel.updateOne({_id:id, UserEmail:UserEmail},PostBody);
        return {status:true, message:"Updated successfully", data:data}
    }
    catch (e) {
        return {status: false, message: e.message}
    }
}
module.exports = UpdateService;