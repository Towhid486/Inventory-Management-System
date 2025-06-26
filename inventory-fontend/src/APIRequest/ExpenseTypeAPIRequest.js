import axios from "axios";
import {ErrorToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {getToken} from "../helper/SessionHelper.js";
import {BaseURL} from "../helper/Config.js";
import {SetExpenseTypeList, SetExpenseTypeListTotal} from "../redux/state-slice/expensetype-slice.js";

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
        console.log(e.toString())
        ErrorToast("Something went wrong")
    }
}