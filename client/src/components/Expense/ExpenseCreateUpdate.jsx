import React, {useEffect, useState} from 'react';
import {CreateUpdateExpenseRequest, ExpenseTypeDropDownRequest, FillExpenseFormRequest} from "../../APIRequest/ExpenseAPIRequest";
import {useSelector} from "react-redux";
import store from "../../redux/store/store";
import {OnChangeExpenseInput, ResetExpenseFormValue} from "../../redux/state-slice/expense-slice";
import {ErrorToast, IsEmpty} from "../../helper/FormHelper";
import {useNavigate} from "react-router-dom";


const ExpenseCreateUpdate = () => {
    let FormValue=useSelector((state)=>(state.expense.FormValue));
    let navigate=useNavigate();
    let [ObjectID,SetObjectID]=useState(0);
    
    useEffect(()=>{
        (async () => {
            await ExpenseTypeDropDownRequest();
        })();
        
        let params= new URLSearchParams(window.location.search);
        let id=params.get('id');
        if(id!==null){
            SetObjectID(id);
            (async () => {
                await FillExpenseFormRequest(id)
            })();
        }else{
            store.dispatch(ResetExpenseFormValue())
        }
    },[])
    let ExpenseTypeDropDown=useSelector((state)=>(state.expense.ExpenseTypeDropDown));
    const SaveChange = async () => {
        if(IsEmpty(FormValue.TypeID)){
            ErrorToast("Expense Type Required !")
        }
        else if(FormValue.Amount<=0){
            ErrorToast("Expense Amount Required !")
        }
        else {
            let Result =  await CreateUpdateExpenseRequest(FormValue,ObjectID)
            if(Result.status){
                navigate("/ExpenseListPage")
            }
        }
    }
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                {
                                    ObjectID !== 0
                                        ? <h5>Edit Expense</h5>
                                        : <h5>Create Expense</h5>
                                }
                                <hr className='bg-light'/>
                                {
                                    ObjectID !== 0
                                        ?
                                        <div className='col-12 col-md-4 p-2'>
                                            <label className='form-label'>Expense ID</label>
                                            <input value={ObjectID} readOnly={true} className='form-control form-control-sm' type='text' />
                                        </div>
                                        : ""
                                }
                                <div className="col-12 col-md-4 p-2">
                                    <label className="form-label">Expense Type</label>
                                    <select onChange={(e)=>{store.dispatch(OnChangeExpenseInput({Name:"TypeID",Value:e.target.value}))}} value={FormValue.TypeID} className="form-select form-select-sm">
                                        <option value="">Select Type</option>
                                        {
                                            ExpenseTypeDropDown.map((item,i)=>{
                                                return( <option key={i} value={item._id}>{item.Name}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-12 col-md-4 p-2">
                                    <label className="form-label">Expense Amount</label>
                                    <input onChange={(e)=>{store.dispatch(OnChangeExpenseInput({Name:"Amount",Value:e.target.value}))}} value={FormValue.Amount} className="form-control form-control-sm" type="number"/>
                                </div>
                                <div className="col-12 col-md-4 p-2">
                                    <label className="form-label">Expense Note</label>
                                    <input onChange={(e)=>{store.dispatch(OnChangeExpenseInput({Name:"Note",Value:e.target.value}))}} value={FormValue.Note} className="form-control form-control-sm" type="text"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 col-md-4 p-2">
                                    <button onClick={SaveChange} className="btn my-3 btn-success">{ObjectID!==0 ? "Save Change" : "Create"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseCreateUpdate;