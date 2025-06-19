const OTPModel = require('../../models/Users/OTPModel')


const UserResetPassService = async (Request,DataModel) => {
    let email = Request.body['email'];
    let OTPCode = Request.body['OTP'];
    let NewPass = Request.body['password'];
    let statusUpdate = 1;
    let OTPpassReset = 1111;

    try{
        //Database First Process
        let OTPUsedCount = await OTPModel.aggregate([{$match: {email:email, otp:OTPCode, status:statusUpdate}}, {$count: "total"}])
        if(OTPUsedCount.length>0){
            //Database Second Process
            let PassUpdate = await DataModel.updateOne({email:email}, {password:NewPass})
            await OTPModel.updateOne({email:email,otp:OTPCode}, {status:OTPpassReset})
            return {status:true, message:"Password Updated", data:PassUpdate}
        }
        else{
            return {status:false, message:"Invalid Request"}
        }
    }catch (e) {
        return {status: false, message: e.message}
    }
}
module.exports = UserResetPassService;