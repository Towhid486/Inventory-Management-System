import axios from "axios";
import {ErrorToast} from "../helper/FormHelper";
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import {catchBlockHandler, getToken} from "../helper/SessionHelper";
import {
    SetExpenseChart,
    SetExpenseTotal, SetPurchaseChart, SetPurchaseTotal,
    SetReturnChart,
    SetReturnTotal, SetSaleChart, SetSaleTotal
} from "../redux/state-slice/dashboard-slice";
import { BaseURL } from './../helper/Config';
const AxiosHeader={headers:{"token":getToken()}}


export async function ExpensesSummary(){
    try {
        store.dispatch(ShowLoader())
        let URL=`${BaseURL}/ExpensesSummary`;
        let {data}=await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            store.dispatch(SetExpenseChart(data['data'][0]['Last30Days']))
            store.dispatch(SetExpenseTotal(data['data'][0]['Total'][0]['TotalAmount']))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(HideLoader())
        const res = e?.response;
        catchBlockHandler(res)
    }
}

export async function ReturnSummary(){
    try {
        store.dispatch(ShowLoader())
        let URL=`${BaseURL}/ReturnSummary`;
        let {data}=await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            store.dispatch(SetReturnChart(data['data'][0]['Last30Days']))
            store.dispatch(SetReturnTotal(data['data'][0]['Total'][0]['TotalAmount']))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(HideLoader())
        const res = e?.response;
        catchBlockHandler(res)
    }
}

export async function SaleSummary(){
    try {
        store.dispatch(ShowLoader())
        let URL=`${BaseURL}/SalesSummary`;
        let {data}=await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            store.dispatch(SetSaleChart(data['data'][0]['Last30Days']))
            store.dispatch(SetSaleTotal(data['data'][0]['Total'][0]['TotalAmount']))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(HideLoader())
        const res = e?.response;
        catchBlockHandler(res)
    }
}

export async function PurchaseSummary(){
    try {
        store.dispatch(ShowLoader())
        let URL=`${BaseURL}/PurchaseSummary`;
        let {data}=await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            store.dispatch(SetPurchaseChart(data['data'][0]['Last30Days']))
            store.dispatch(SetPurchaseTotal(data['data'][0]['Total'][0]['TotalAmount']))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(HideLoader())
        const res = e?.response;
        catchBlockHandler(res)
    }
}

