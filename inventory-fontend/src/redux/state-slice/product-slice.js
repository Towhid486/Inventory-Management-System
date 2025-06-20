import {createSlice} from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name:'product',
    initialState:{
        value:[]
    },
    reducers:{
        SetProduct:(state,action)=>{
            state.value = action.payload;
        },
    }
})
export const {SetProduct} = productSlice.actions;
export default productSlice.reducer;