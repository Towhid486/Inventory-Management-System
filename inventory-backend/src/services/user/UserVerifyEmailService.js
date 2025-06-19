const OTPModel = require('../../models/Users/OTPModel')
const SendEmailUtility = require('../../utility/SendEmailUtility')

const UserVerifyEmailService = async (Request,DataModel) => {
    try{
        //Email Account Query
        let email = Request.params.email;
        let OTPCode = Math.floor(100000 + Math.random() * 900000);

        //Database First Process
        let UserCount = await DataModel.aggregate([{$match: {email:email}}, {$count: "total"}])
        if(UserCount.length>0){
            //Otp Insert
            //Database Second Process
            await OTPModel.create({email:email, otp:OTPCode})

            //Email Send
            let SendEmail = await SendEmailUtility(email, "Inventory Management PIN Verification", `Your OTP Code is = ${OTPCode}`)
            return {status:true, Message:"OTP Sent to your Email"}
        }else{
            return {status:false, message:"User Not Found"}
        }
    }catch (e) {
        return {status: false, message: e.message}
    }
}
module.exports = UserVerifyEmailService;