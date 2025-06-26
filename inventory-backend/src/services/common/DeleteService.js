const DeleteService = async (Request, Model) => {
    try{
        let DeleteID = Request.params.id;
        let UserEmail = Request.headers.email;

        let QueryObject = {}
        QueryObject['_id'] = DeleteID
        QueryObject[UserEmail] = UserEmail;

        let Delete = await Model.deleteMany(QueryObject);

        return {status:true, data:Delete}
        
    }catch (e) {
        return {status:false, message:e.toString()}
    }
}
module.exports=DeleteService