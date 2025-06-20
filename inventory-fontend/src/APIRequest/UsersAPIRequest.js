import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {getToken, setEmail, setOTP, setToken, setUserDetails} from "../helper/SessionHelper.js";
import {SetProfile} from "../redux/state-slice/profile-slice.js";
import {BaseURL} from "../helper/Config.js";

const AxiosHeader = {headers:{token:getToken()}}

export const RegistrationRequest = async (email, firstName, lastName, mobile, password, photo) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/Registration`
        let PostBody = {email: email,firstName: firstName,lastName: lastName,mobile: mobile,password: password,photo: photo}
        let {data} = await axios.post(URL, PostBody)
        store.dispatch(HideLoader())
        
        if(data.status){
            SuccessToast("User Successfully registered")
        }
        else{
            ErrorToast("Something went wrong")
        }
        return data;
    }
    catch (e) {
        store.dispatch(HideLoader())
        console.log(e.toString())
        ErrorToast("Something went wrong")
    }
}
export const LoginRequest = async (email,password) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/Login`
        let PostBody = {email: email,password: password}
        let {data} = await axios.post(URL, PostBody)
        store.dispatch(HideLoader())
        if(data.status){
            setToken(data['token']);
            setUserDetails(data['data'])
            SuccessToast(data?.message)
            return data;
        }
        else{
            ErrorToast(data.message)
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        console.log(e.toString())
        ErrorToast("Something went wrong")
    }
}

export const GetProfileDetailsRequest = async () =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/profileDetails`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            store.dispatch(SetProfile(data?.data))
        }
        else{
            ErrorToast("Something went wrong")
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        console.log(e.toString())
        ErrorToast("Something went wrong")
    }
}
export const ProfileUpdateRequest = async (email,firstName,lastName,mobile,password,photo) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/profileUpdate`;
        let PostBody = {email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password,photo:photo}
        let UserDetails = {email:email,firstName:firstName,lastName:lastName,mobile:mobile,photo:photo}
        
        let {data} = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(data?.status){
            SuccessToast(data?.message)
            setUserDetails(UserDetails)
        }
        else{
            console.log(data?.message)
            ErrorToast("Something went wrong")
        }
        return data;
    }
    catch (e) {
        store.dispatch(HideLoader())
        ErrorToast("Something went wrong")
        console.log(e.toString())
    }
}


// Recover Password Step 01 Send OTP
export const RecoverVerifyEmailRequest = async (email) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/RecoverVerifyEmail/${email}`;
        let {data} = await axios.get(URL)
        store.dispatch(HideLoader())
        if(data?.status){
            setEmail(email)
            SuccessToast("A 6 Digit Verification Code sent to your email")
            return data;
        }
        else{
            ErrorToast(data.message)
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        console.log(e.toString())
        ErrorToast("Something went wrong")
    }
}

// Recover Password Step 02 Verify OTP
export const RecoverVerifyOTPRequest = async (email,OTP) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/RecoverVerifyOTP/${email}/${OTP}`;
        let {data} = await axios.get(URL)
        store.dispatch(HideLoader())
        if(data?.status){
            setOTP(OTP)
            SuccessToast(data?.message)
            return data;
        }
        else{
            ErrorToast(data?.message)
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        console.log(e.toString())
        ErrorToast("Something went wrong")
    }
}

// Recover Password Step 03 Reset Password
export const RecoverResetPasswordRequest = async (email,OTP,password) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/RecoverResetPass`;
        let PostBody = {email:email,OTP:OTP,password:password}
        
        let {data} = await axios.post(URL,PostBody)
        console.log(OTP,email,password)
        store.dispatch(HideLoader())
        if(data?.status){
            SuccessToast(data?.message)
            return data;
        }
        else{
            ErrorToast("Something went wrong")
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        console.log(e.toString())
        ErrorToast("Something went wrong")
    }
}


