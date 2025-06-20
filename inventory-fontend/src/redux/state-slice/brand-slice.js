import {createSlice} from "@reduxjs/toolkit";

export const brandSlice = createSlice({
    name:'brand',
    initialState:{
        value:[]
    },
    reducers:{
        SetBrand:(state,action)=>{
            state.value = action.payload;
        },
    }
})
export const {SetBrand} = brandSlice.actions;
export default brandSlice.reducer;