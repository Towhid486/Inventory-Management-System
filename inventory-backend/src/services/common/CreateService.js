const CreateService = async (Request,DataModel) => {
    try {
        let email = Request.headers['email'];
        console.log(email)
        let PostBody = Request.body;
        PostBody.UserEmail = email;

        let data = await DataModel.create(PostBody)
        return {status:true, message:"One new Created", data:data}
    }
    catch (e) {
        return {status: false, message: e.toString()}
    }
}
module.exports = CreateService;