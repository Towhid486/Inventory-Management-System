import {createSlice} from "@reduxjs/toolkit";

export const returnSlice = createSlice({
    name:'report',
    initialState:{
        value:[]
    },
    reducers:{
        SetReturn:(state,action)=>{
            state.value = action.payload;
        },
    }
})
export const {SetReturn} = returnSlice.actions;
export default returnSlice.reducer;