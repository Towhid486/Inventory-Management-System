import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {catchBlockHandler, getToken} from "../helper/SessionHelper.js";
import {BaseURL} from "../helper/Config.js";
import {
    OnChangeExpenseTypeInput,
    SetExpenseTypeList,
    SetExpenseTypeListTotal
} from "../redux/state-slice/expensetype-slice.js";
import {OnChangeSupplierInput, ResetFormValue} from "../redux/state-slice/supplier-slice.js";

const AxiosHeader = {headers:{token:getToken()}}

export const ExpenseTypeListRequest = async (pageNo,perPage,searchKeyword) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/ExpenseTypesList/${pageNo}/${perPage}/${searchKeyword}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            if(data.data[0]['Rows'].length>0){
                store.dispatch(SetExpenseTypeList(data.data[0]['Rows']))
                store.dispatch(SetExpenseTypeListTotal(data.data[0]['Total'][0]['count']))
            }else{
                store.dispatch(SetExpenseTypeList([]))
                store.dispatch(SetExpenseTypeListTotal(0))
                ErrorToast("No Data Found")
            }
        }else{
            ErrorToast("Something Went Wrong!")
        }
    }catch (e) {
        store.dispatch(HideLoader())
        const res = e?.response;
        catchBlockHandler(res)
    }
}

export const CreateExpenseTypeRequest = async (PostBody,ObjectID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/CreateExpenseTypes`
        if(ObjectID!==0){
            URL = `${BaseURL}/UpdateExpenseTypes/${ObjectID}`
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
        const res = e?.response;
        catchBlockHandler(res)
    }
}

export const FillExpenseTypeFormRequest = async (ObjectID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/ExpenseTypesDetailsByID/${ObjectID}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            let FormValue = data?.data[0];
            store.dispatch(OnChangeExpenseTypeInput({Name:"Name", Value:FormValue['Name']}))
        }else{
            ErrorToast("Request Fail ! Try again")
        }
        return data;
    }catch (e) {
        store.dispatch(HideLoader())
        const res = e?.response;
        catchBlockHandler(res)
    }
}

export const DeleteExpenseTypeRequest = async (ID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/DeleteExpenseType/${ID}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status==="Associate"){
            ErrorToast(data['data'])
        }
        else if(data.status===true){
            SuccessToast("ExpenseType Delete Successful")
            return data;
        }
        else{
            ErrorToast("Request Fail ! Try Again")
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        const res = e?.response;
        catchBlockHandler(res)
    }
}