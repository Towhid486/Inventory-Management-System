import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {getToken} from "../helper/SessionHelper.js";
import {BaseURL} from "../helper/Config.js";
import {
    OnChangeCustomerInput,
    ResetFormValue,
    SetCustomerList,
    SetCustomerListTotal
} from "../redux/state-slice/customer-slice.js";

const AxiosHeader = {headers:{token:getToken()}}

export const CustomersListRequest = async (pageNo,perPage,searchKeyword) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/CustomersList/${pageNo}/${perPage}/${searchKeyword}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            if(data.data[0]['Rows'].length>0){
                store.dispatch(SetCustomerList(data.data[0]['Rows']))
                store.dispatch(SetCustomerListTotal(data.data[0]['Total'][0]['count']))
            }else{
                store.dispatch(SetCustomerList([]))
                store.dispatch(SetCustomerListTotal(0))
                ErrorToast("No Data Found")
            }
        }else{
            ErrorToast("Something Went Wrong!")
        }
    }catch (e) {
        store.dispatch(HideLoader())
        console.log(e.toString())
        ErrorToast("Something went wrong")
    }
}

export const CreateUpdateCustomerRequest = async (PostBody,ObjectID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/CreateCustomers`
        if(ObjectID!==0){
            URL = `${BaseURL}/UpdateCustomers/${ObjectID}`
        }
        let {data} = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            SuccessToast("Request Successful")
            store.dispatch(ResetFormValue())
        }else{
            ErrorToast("Request Fail ! Try again")
        }
        return data;
    }catch (e) {
        store.dispatch(HideLoader())
        console.log(e.toString())
        ErrorToast("Something went wrong")
    }
}

export const FillCustomerFormRequest = async (ObjectID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/CustomerDetailsByID/${ObjectID}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            let FormValue = data?.data[0];
            store.dispatch(OnChangeCustomerInput({Name:"CustomerName", Value:FormValue['CustomerName']}))
            store.dispatch(OnChangeCustomerInput({Name:"Phone", Value:FormValue['Phone']}))
            store.dispatch(OnChangeCustomerInput({Name:"Email", Value:FormValue['Email']}))
            store.dispatch(OnChangeCustomerInput({Name:"Address", Value:FormValue['Address']}))
        }else{
            ErrorToast("Request Fail ! Try again")
        }
        return data;
    }catch (e) {
        store.dispatch(HideLoader())
        console.log(e.toString())
        ErrorToast("Something went wrong")
    }
}


export const DeleteCustomerRequest = async (CustomerID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/DeleteCustomers/${CustomerID}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status==="Associate"){
            ErrorToast(data['data'])
        }
        if(data.status===true){
            SuccessToast("Customer Delete Successful")
            return data;
        }
        else{
            ErrorToast("Request Fail ! Try Again")
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        ErrorToast("Something went wrong")
        console.log(e.toString())
    }
}