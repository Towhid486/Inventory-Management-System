const CreateToken = require('../../utility/CreateToken')


const UserLoginService = async (Request,DataModel) => {
    try{
        let postBody = Request.body;
        const data = await DataModel.aggregate([{$match: postBody},{$project: {_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1}}])
        if(data.length>0){
            let token = await CreateToken(data[0]['email'])
            return {status:true, token:token, data:data[0]}
        }else{
            return {status:false, message:"Unauthorized"}
        }
    }catch (e) {
        return {status: false, message: e.message}
    }
}
module.exports = UserLoginService;