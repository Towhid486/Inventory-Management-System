import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {catchBlockHandler, getToken} from "../helper/SessionHelper.js";
import {BaseURL} from "../helper/Config.js";
import {
    OnChangeCategoryInput,
    ResetCategoryFormValue,
    SetCategoryList,
    SetCategoryListTotal
} from "../redux/state-slice/category-slice.js";

const AxiosHeader = {headers:{token:getToken()}}

export const CategoryListRequest = async (pageNo,perPage,searchKeyword) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/CategoriesList/${pageNo}/${perPage}/${searchKeyword}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            if(data.data[0]['Rows'].length>0){
                store.dispatch(SetCategoryList(data.data[0]['Rows']))
                store.dispatch(SetCategoryListTotal(data.data[0]['Total'][0]['count']))
            }else{
                store.dispatch(SetCategoryList([]))
                store.dispatch(SetCategoryListTotal(0))
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

export const CreateUpdateCategoryRequest = async (PostBody,ObjectID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/CreateCategories`
        if(ObjectID!==0){
            URL = `${BaseURL}/UpdateCategories/${ObjectID}`
        }
        let {data} = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            SuccessToast("Request Successful")
            store.dispatch(ResetCategoryFormValue())
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

export const FillCategoryFormRequest = async (ObjectID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/CategoriesDetailsByID/${ObjectID}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            let FormValue = data?.data[0];
            store.dispatch(OnChangeCategoryInput({Name:"Name", Value:FormValue['Name']}))
            
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

export const DeleteCategoryRequest = async (CategoryID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/DeleteCategories/${CategoryID}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status==="Associate"){
            ErrorToast(data['data'])
        }
        else if(data.status===true){
            SuccessToast("Category Delete Successful")
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