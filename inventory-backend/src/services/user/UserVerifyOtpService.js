
const UserVerifyOtpService = async (Request,OTPModel) => {
    try{
        let email = Request.params.email;
        let OTPCode = Request.params.otp;
        let status = 0;
        let statusUpdate = 1;

        //Database First Process
        let OtpCount = await OTPModel.aggregate([{$match: {email:email, otp:OTPCode, status:status}}, {$count: "total"}])

        if(OtpCount.length>0){
            //Database Second Process
            let OtpUpdate = await OTPModel.updateOne({email:email, otp:OTPCode, status:status}, {email:email, otp:OTPCode, status:statusUpdate})
            return {status:true, message:"OTP Verification Success", data:OtpUpdate}
        }
        else{
            return {status:false, message:"Invalid OTP Code"}
        }
    }catch (e) {
        return {status: false, message: e.message}
    }
}
module.exports = UserVerifyOtpService;