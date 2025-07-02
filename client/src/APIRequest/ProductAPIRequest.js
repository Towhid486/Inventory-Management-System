import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {catchBlockHandler, getToken} from "../helper/SessionHelper.js";
import {BaseURL} from "../helper/Config.js";
import {
    ResetProductFormValue,
    SetProductList,
    SetProductListTotal,
    OnChangeProductInput,
    SetProductCategoryDropDown,
    SetProductBrandDropDown
} from "../redux/state-slice/product-slice.js";

const AxiosHeader = {headers:{token:getToken()}}

export const ProductsListRequest = async (pageNo,perPage,searchKeyword) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/ProductsList/${pageNo}/${perPage}/${searchKeyword}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            if(data.data[0]['Rows'].length>0){
                store.dispatch(SetProductList(data.data[0]['Rows']))
                store.dispatch(SetProductListTotal(data.data[0]['Total'][0]['count']))
            }else{
                store.dispatch(SetProductList([]))
                store.dispatch(SetProductListTotal(0))
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

export const CreateUpdateProductRequest = async (PostBody,ObjectID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/CreateProducts`
        if(ObjectID!==0){
            URL = `${BaseURL}/UpdateProducts/${ObjectID}`
        }
        let {data} = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            SuccessToast("Request Successful")
            store.dispatch(ResetProductFormValue())
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

export const FillProductFormRequest = async (ProductID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/ProductsDetailsByID/${ProductID}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            let FormValue = data?.data[0];
            store.dispatch(OnChangeProductInput({Name:"CategoryID",Value:FormValue['CategoryID']}));
            store.dispatch(OnChangeProductInput({Name:"BrandID",Value:FormValue['BrandID']}));
            store.dispatch(OnChangeProductInput({Name:"Name",Value:FormValue['Name']}));
            store.dispatch(OnChangeProductInput({Name:"Unit",Value:FormValue['Unit']}));
            store.dispatch(OnChangeProductInput({Name:"Price",Value:FormValue['Price']}));
            store.dispatch(OnChangeProductInput({Name:"Details",Value:FormValue['Details']}));
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

export async function ProductCategoryDropDownRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = `${BaseURL}/CategoriesDropDown`
        const {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (data.status) {
            if (data['data'].length > 0) {
                store.dispatch(SetProductCategoryDropDown(data['data']))
            } else {
                store.dispatch(SetProductCategoryDropDown([]));
                ErrorToast("No Product Category Found");
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

export async function ProductBrandDropDownRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = `${BaseURL}/BrandDropDown`;
        const {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (data.status) {
            if (data['data'].length > 0) {
                store.dispatch(SetProductBrandDropDown(data['data']))
            } else {
                store.dispatch(SetProductBrandDropDown([]));
                ErrorToast("No Product Brand Found");
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export const DeleteProductRequest = async (ProductID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/DeleteProducts/${ProductID}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status==="Associate"){
            ErrorToast(data['data'])
        }
        else if(data.status===true){
            SuccessToast("Product Delete Successful")
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


