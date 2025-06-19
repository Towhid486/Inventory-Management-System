const UserDetailsService = async (Request,DataModel) => {
    try{
        const data = await DataModel.aggregate([{$match: {email: Request.headers['email']}}])
        return {status:true, data:data}
    }catch (e) {
        return {status: false, message: e.message}
    }
}
module.exports = UserDetailsService;