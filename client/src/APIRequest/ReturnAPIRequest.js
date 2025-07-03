import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {catchBlockHandler, getToken} from "../helper/SessionHelper.js";
import {BaseURL} from "../helper/Config.js";
import {SetReturnList, SetReturnListTotal, SetCustomerDropDown, SetProductDropDown} from "../redux/state-slice/return-slice.js";

const AxiosHeader = {headers:{token:getToken()}}

export const ReturnsListRequest = async (pageNo,perPage,searchKeyword) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/ReturnsList/${pageNo}/${perPage}/${searchKeyword}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            if(data.data[0]['Rows'].length>0){
                store.dispatch(SetReturnList(data.data[0]['Rows']))
                store.dispatch(SetReturnListTotal(data.data[0]['Total'][0]['count']))
            }else{
                store.dispatch(SetReturnList([]))
                store.dispatch(SetReturnListTotal(0))
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


export async function CustomerDropDownRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = `${BaseURL}/CustomersDropDown`;
        const {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (data.status) {
            if (data['data'].length > 0) {
                store.dispatch(SetCustomerDropDown(data['data']))
            } else {
                store.dispatch(SetCustomerDropDown([]));
                ErrorToast("No Customer Found");
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        const res = e?.response;
        catchBlockHandler(res)
    }
}

export async function ProductDropDownRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = `${BaseURL}/ProductsDropDown`;
        const {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (data.status) {
            if (data['data'].length > 0) {
                store.dispatch(SetProductDropDown(data['data']))
            } else {
                store.dispatch(SetProductDropDown([]));
                ErrorToast("No Product Found");
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        const res = e?.response;
        catchBlockHandler(res)
    }
}


export async function CreateReturnRequest(ParentBody,ChildsBody) {
    try {
        
        store.dispatch(ShowLoader())
        let PostBody={"Parent":ParentBody, "Childs":ChildsBody}
        let URL = `${BaseURL}/CreateReturns`
        const {data} = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (data.status) {
            SuccessToast("Request Successful");
        }
        else {
            ErrorToast("Request Fail ! Try Again")
        }
        return data;
    }
    catch (e) {
        store.dispatch(HideLoader())
        const res = e?.response;
        catchBlockHandler(res)
    }
}