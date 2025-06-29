import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {catchBlockHandler, getToken} from "../helper/SessionHelper.js";
import {BaseURL} from "../helper/Config.js";
import {
    SetSupplierList,
    SetSupplierListTotal,
    OnChangeSupplierInput,
    ResetFormValue
} from "../redux/state-slice/supplier-slice.js";

const AxiosHeader = {headers:{token:getToken()}}

export const SupplierListRequest = async (pageNo,perPage,searchKeyword) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/SuppliersList/${pageNo}/${perPage}/${searchKeyword}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            if(data.data[0]['Rows'].length>0){
                store.dispatch(SetSupplierList(data.data[0]['Rows']))
                store.dispatch(SetSupplierListTotal(data.data[0]['Total'][0]['count']))
            }else{
                store.dispatch(SetSupplierList([]))
                store.dispatch(SetSupplierListTotal(0))
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

export const CreateUpdateSupplierRequest = async (PostBody,ObjectID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/CreateSuppliers`
        if(ObjectID!==0){
            URL = `${BaseURL}/UpdateSuppliers/${ObjectID}`
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

export const FillSupplierFormRequest = async (ObjectID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/SuppliersDetailsByID/${ObjectID}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            let FormValue = data?.data[0];
            store.dispatch(OnChangeSupplierInput({Name:"SupplierName", Value:FormValue['SupplierName']}))
            store.dispatch(OnChangeSupplierInput({Name:"Phone", Value:FormValue['Phone']}))
            store.dispatch(OnChangeSupplierInput({Name:"Email", Value:FormValue['Email']}))
            store.dispatch(OnChangeSupplierInput({Name:"Address", Value:FormValue['Address']}))
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

export const DeleteSupplierRequest = async (SupplierID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/DeleteSupplier/${SupplierID}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status==="Associate"){
            ErrorToast(data['data'])
        }
        else if(data.status===true){
            SuccessToast("Supplier Delete Successful")
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