import {createSlice} from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name:'dashboard',
    initialState:{
        value:[]
    },
    reducers:{
        SetDashboard:(state,action)=>{
            state.value = action.payload;
        },
    }
})
export const {SetDashboard} = dashboardSlice.actions;
export default dashboardSlice.reducer;