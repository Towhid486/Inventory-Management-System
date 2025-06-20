import {createSlice} from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
    name:'expense',
    initialState:{
        value:[]
    },
    reducers:{
        SetExpense:(state,action)=>{
            state.value = action.payload;
        },
    }
})
export const {SetExpense} = expenseSlice.actions;
export default expenseSlice.reducer;