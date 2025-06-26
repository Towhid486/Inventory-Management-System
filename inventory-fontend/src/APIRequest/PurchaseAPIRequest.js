import axios from "axios";
import {ErrorToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {getToken} from "../helper/SessionHelper.js";
import {BaseURL} from "../helper/Config.js";
import {SetPurchaseList, SetPurchaseListTotal} from "../redux/state-slice/purchase-slice.js";

const AxiosHeader = {headers:{token:getToken()}}

export const PurchaseListRequest = async (pageNo,perPage,searchKeyword) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/PurchasesList/${pageNo}/${perPage}/${searchKeyword}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            if(data.data[0]['Rows'].length>0){
                store.dispatch(SetPurchaseList(data.data[0]['Rows']))
                store.dispatch(SetPurchaseListTotal(data.data[0]['Total'][0]['count']))
            }else{
                store.dispatch(SetPurchaseList([]))
                store.dispatch(SetPurchaseListTotal(0))
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