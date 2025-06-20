import {createSlice} from "@reduxjs/toolkit";

export const expensetypeSlice = createSlice({
    name:'expensetype',
    initialState:{
        value:[]
    },
    reducers:{
        SetExpenseType:(state,action)=>{
            state.value = action.payload;
        },
    }
})
export const {SetExpenseType} = expensetypeSlice.actions;
export default expensetypeSlice.reducer;