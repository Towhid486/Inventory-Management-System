import {createSlice} from "@reduxjs/toolkit";

export const supplierSlice = createSlice({
    name:'supplier',
    initialState:{
        value:[]
    },
    reducers:{
        SetSupplier:(state,action)=>{
            state.value = action.payload;
        },
    }
})
export const {SetSupplier} = supplierSlice.actions;
export default supplierSlice.reducer;