import {createSlice} from "@reduxjs/toolkit";

export const purchaseSlice = createSlice({
    name:'purchase',
    initialState:{
        value:[]
    },
    reducers:{
        SetPurchase:(state,action)=>{
            state.value = action.payload;
        },
    }
})
export const {SetPurchase} = purchaseSlice.actions;
export default purchaseSlice.reducer;