import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {catchBlockHandler, getToken} from "../helper/SessionHelper.js";
import {BaseURL} from "../helper/Config.js";
import {
    OnChangeBrandInput,
    ResetBrandFormValue,
    SetBrandList,
    SetBrandListTotal
} from "../redux/state-slice/brand-slice.js";

const AxiosHeader = {headers:{token:getToken()}}

export const BrandListRequest = async (pageNo,perPage,searchKeyword) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/BrandList/${pageNo}/${perPage}/${searchKeyword}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            if(data.data[0]['Rows'].length>0){
                store.dispatch(SetBrandList(data.data[0]['Rows']))
                store.dispatch(SetBrandListTotal(data.data[0]['Total'][0]['count']))
            }else{
                store.dispatch(SetBrandList([]))
                store.dispatch(SetBrandListTotal(0))
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

export const CreateUpdateBrandRequest = async (PostBody,ObjectID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/CreateBrand`
        if(ObjectID!==0){
            URL = `${BaseURL}/UpdateBrand/${ObjectID}`
        }
        let {data} = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            SuccessToast("Request Successful")
            store.dispatch(ResetBrandFormValue())
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

export const FillBrandFormRequest = async (ObjectID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/BrandDetailsByID/${ObjectID}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            let FormValue = data?.data[0];
            store.dispatch(OnChangeBrandInput({Name:"Name", Value:FormValue['Name']}))

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

export const DeleteBrandRequest = async (BrandID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/DeleteBrand/${BrandID}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status==="Associate"){
            ErrorToast(data['data'])
        }
        else if(data.status===true){
            SuccessToast("Brand Delete Successful")
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