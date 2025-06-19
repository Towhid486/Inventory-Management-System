const DropDownService = async (Request,DataModel,Projection) => {
    try{
        let UserEmail = Request.headers['email'];
        let data = await DataModel.aggregate([
            {$match: {UserEmail:UserEmail}},
            {$project:Projection}
        ])
        return {status:true, data:data}
    }
    catch (e) {
        return {status: false, message: e.message}
    }
}
module.exports = DropDownService;