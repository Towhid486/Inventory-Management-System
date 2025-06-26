import axios from "axios";
import {ErrorToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {getToken} from "../helper/SessionHelper.js";
import {BaseURL} from "../helper/Config.js";
import {SetSupplierList, SetSupplierListTotal} from "../redux/state-slice/supplier-slice.js";

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
        console.log(e.toString())
        ErrorToast("Something went wrong")
    }
}