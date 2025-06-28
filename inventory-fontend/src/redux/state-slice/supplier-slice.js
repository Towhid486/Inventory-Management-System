import {createSlice} from "@reduxjs/toolkit";

export const supplierSlice = createSlice({
    name:'supplier',
    initialState:{
        List:[],
        ListTotal:0,
        FormValue:{
            SupplierName:"",
            Phone:"",
            Email:"",
            Address:""
        }
    },
    reducers:{
        SetSupplierList:(state,action)=>{
            state.List = action.payload;
        },
        SetSupplierListTotal:(state,action)=>{
            state.ListTotal = action.payload;
        },
        OnChangeSupplierInput:(state,action)=>{
            state.FormValue[`${action.payload.Name}`] = action.payload.Value;
        },
        ResetFormValue:(state)=>{
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "")
        }
    }
})
export const {SetSupplierList,SetSupplierListTotal,OnChangeSupplierInput,ResetFormValue} = supplierSlice.actions;
export default supplierSlice.reducer;