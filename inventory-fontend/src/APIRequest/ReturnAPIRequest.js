import axios from "axios";
import {ErrorToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {catchBlockHandler, getToken} from "../helper/SessionHelper.js";
import {BaseURL} from "../helper/Config.js";
import {SetReturnList, SetReturnListTotal} from "../redux/state-slice/return-slice.js";

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