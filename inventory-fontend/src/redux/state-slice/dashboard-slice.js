import {createSlice} from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name:'dashboard',
    initialState:{
        List:[],
        ListTotal:0,
    },
    reducers:{
        SetDashboardList:(state,action)=>{
            state.List = action.payload;
        },
        SetDashboardListTotal:(state,action)=>{
            state.ListTotal = action.payload;
        },
    }
})
export const {SetDashboardList,SetDashboardListTotal} = dashboardSlice.actions;
export default dashboardSlice.reducer;