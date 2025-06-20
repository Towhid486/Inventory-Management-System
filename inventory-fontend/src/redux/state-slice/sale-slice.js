import {createSlice} from "@reduxjs/toolkit";

export const saleSlice = createSlice({
    name:'sale',
    initialState:{
        value:[]
    },
    reducers:{
        SetSale:(state,action)=>{
            state.value = action.payload;
        },
    }
})
export const {SetSale} = saleSlice.actions;
export default saleSlice.reducer;