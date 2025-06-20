import {createSlice} from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name:'category',
    initialState:{
        value:[]
    },
    reducers:{
        SetCategory:(state,action)=>{
            state.value = action.payload;
        },
    }
})
export const {SetCategory} = categorySlice.actions;
export default categorySlice.reducer;