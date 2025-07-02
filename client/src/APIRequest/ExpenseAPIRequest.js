import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper.js";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import {catchBlockHandler, getToken} from "../helper/SessionHelper.js";
import {BaseURL} from "../helper/Config.js";
import {
    OnChangeExpenseInput,
    ResetExpenseFormValue,
    SetExpenseList,
    SetExpenseListTotal,
    SetExpenseTypeDropDown
} from "../redux/state-slice/expense-slice.js";

const AxiosHeader = {headers:{token:getToken()}}

export const ExpensesListRequest = async (pageNo,perPage,searchKeyword) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/ExpensesList/${pageNo}/${perPage}/${searchKeyword}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            if(data.data[0]['Rows'].length>0){
                store.dispatch(SetExpenseList(data.data[0]['Rows']))
                store.dispatch(SetExpenseListTotal(data.data[0]['Total'][0]['count']))
            }else{
                store.dispatch(SetExpenseList([]))
                store.dispatch(SetExpenseListTotal(0))
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


export async function ExpenseTypeDropDownRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/ExpenseTypesDropDown`
        const {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (data.status) {
            if (data['data'].length > 0) {
                store.dispatch(SetExpenseTypeDropDown(data['data']))
            } else {
                store.dispatch(SetExpenseTypeDropDown([]))
                ErrorToast("No Expense Type Found")
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

export const CreateUpdateExpenseRequest = async (PostBody,ObjectID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/CreateExpenses`
        if(ObjectID!==0){
            URL = `${BaseURL}/UpdateExpenses/${ObjectID}`
        }
        let {data} = await axios.post(URL,PostBody,AxiosHeader)
        console.log(PostBody)
        
        store.dispatch(HideLoader())
        if(data.status){
            SuccessToast("Request Successful")
            store.dispatch(ResetExpenseFormValue())
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

export const FillExpenseFormRequest = async (ExpenseID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/ExpenseDetailsByID/${ExpenseID}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status){
            let FormValue = data?.data[0];
            store.dispatch(OnChangeExpenseInput({Name:"TypeID", Value:FormValue['TypeID']}))
            store.dispatch(OnChangeExpenseInput({Name:"Amount", Value:FormValue['Amount']}))
            store.dispatch(OnChangeExpenseInput({Name:"Note", Value:FormValue['Note']}))
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

export const DeleteExpenseRequest = async (ExpenseID) =>{
    try{
        store.dispatch(ShowLoader())
        let URL = `${BaseURL}/DeleteExpense/${ExpenseID}`
        let {data} = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(data.status==="Associate"){
            ErrorToast(data['data'])
        }
        else if(data.status===true){
            SuccessToast("Expense Delete Successful")
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
