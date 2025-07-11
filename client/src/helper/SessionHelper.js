import {ErrorToast} from "./FormHelper.js";

class SessionHelper {

    setToken(token){
        localStorage.setItem("token",token);
    }
    getToken(){
        return localStorage.getItem("token");
    }
    setUserDetails(UserDetails) {
        localStorage.setItem("UserDetails",JSON.stringify(UserDetails))
    }
    getUserDetails() {
        return JSON.parse(localStorage.getItem("UserDetails"))
    }

    setEmail(Email){
        localStorage.setItem("Email",Email);
    }
    getEmail(){
        return localStorage.getItem("Email");
    }

    setOTP(OTP){
        localStorage.setItem("OTP",OTP);
    }
    getOTP(){
        return localStorage.getItem("OTP");
    }

    removeSessions=()=>{
        localStorage.clear();
        window.location.href="/login"
    }
    
    catchBlockHandler=(res)=>{
        if (res?.status === 401 && res?.data?.message === "Token expired") {
            ErrorToast("Session Expired! Sign In Please");
            this.removeSessions();
        } else {
            console.log(res);
            ErrorToast("Something went wrong");
        }
    }
}
export const {setToken,getToken,catchBlockHandler,setEmail,getEmail,setOTP,getOTP,setUserDetails,getUserDetails,removeSessions} = new SessionHelper();