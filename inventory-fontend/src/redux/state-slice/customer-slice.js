import {createSlice} from "@reduxjs/toolkit";

export const customerSlice = createSlice({
    name:'customer',
    initialState:{
        value:[]
    },
    reducers:{
        SetCustomer:(state,action)=>{
            state.value = action.payload;
        },
    }
})
export const {SetCustomer} = customerSlice.actions;
export default customerSlice.reducer;