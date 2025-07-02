import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {BaseURL} from "../helper/Config.js";
import axios from "axios";
import {ErrorToast} from "../helper/FormHelper.js";
import {catchBlockHandler, getToken} from "../helper/SessionHelper.js";
import {
    SetExpensesByDateList,
    SetPurchaseByDateList,
    SetReturnByDateList,
    SetSalesByDateList
} from "../redux/state-slice/report-slice.js";

const AxiosHeader = {headers:{token:getToken()}}


export const ExpensesByDateRequest = async (FormData,ToDate) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/ExpensesByDate`
        let PostBody={"FormDate":FormData+"T00:00:00.000+00:00","ToDate":ToDate+"T00:00:00.000+00:00"}
        let {data} = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            store.dispatch(SetExpensesByDateList(data['data']))
        }else{
            ErrorToast("Something Went Wrong!")
        }
    }catch (e) {
        store.dispatch(HideLoader())
        const res = e?.response;
        catchBlockHandler(res)
    }
}
export const SalesByDateRequest = async (FormData,ToDate) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/SalesByDate`
        let PostBody={"FormDate":FormData+"T00:00:00.000+00:00","ToDate":ToDate+"T00:00:00.000+00:00"}
        let {data} = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            store.dispatch(SetSalesByDateList(data['data']))
        }else{
            ErrorToast("Something Went Wrong!")
        }
    }catch (e) {
        store.dispatch(HideLoader())
        const res = e?.response;
        catchBlockHandler(res)
    }
}
export const PurchaseByDateRequest = async (FormData,ToDate) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/PurchasesByDate`
        let PostBody={"FormDate":FormData+"T00:00:00.000+00:00","ToDate":ToDate+"T00:00:00.000+00:00"}
        let {data} = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            store.dispatch(SetPurchaseByDateList(data['data']))
        }else{
            ErrorToast("Something Went Wrong!")
        }
    }catch (e) {
        store.dispatch(HideLoader())
        const res = e?.response;
        catchBlockHandler(res)
    }
}
export const ReturnByDateRequest = async (FormData,ToDate) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/ReturnByDate`
        let PostBody={"FormDate":FormData+"T00:00:00.000+00:00","ToDate":ToDate+"T00:00:00.000+00:00"}
        let {data} = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            store.dispatch(SetReturnByDateList(data['data']))
        }else{
            ErrorToast("Something Went Wrong!")
        }
    }catch (e) {
        store.dispatch(HideLoader())
        const res = e?.response;
        catchBlockHandler(res)
    }
}
