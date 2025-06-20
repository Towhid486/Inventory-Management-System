import {createSlice} from "@reduxjs/toolkit";

export const reportSlice = createSlice({
    name:'report',
    initialState:{
        value:[]
    },
    reducers:{
        SetReport:(state,action)=>{
            state.value = action.payload;
        },
    }
})
export const {SetReport} = reportSlice.actions;
export default reportSlice.reducer;