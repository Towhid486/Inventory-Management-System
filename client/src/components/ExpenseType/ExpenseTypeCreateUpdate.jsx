import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {CreateExpenseTypeRequest, FillExpenseTypeFormRequest} from "../../APIRequest/ExpenseTypeAPIRequest";
import {ErrorToast,IsEmpty} from "../../helper/FormHelper";
import store from "../../redux/store/store";
import {OnChangeExpenseTypeInput, ResetExpenseTypeFormValue} from "../../redux/state-slice/expensetype-slice";

const ExpenseTypeCreateUpdate = () => {
    
    let FormValue=useSelector((state)=>(state.expensetype.FormValue));
    let navigate=useNavigate();
    let [ObjectID,SetObjectID]=useState(0);
    
    useEffect(()=>{
        let params= new URLSearchParams(window.location.search);
        let id=params.get('id');
        if(id!==null){
            SetObjectID(id);
            (async () => {
                await FillExpenseTypeFormRequest(id);
            })();
        }else{
            store.dispatch(ResetExpenseTypeFormValue())
        }
    },[])
    
    
    
    const SaveChange = async () => {
        if(IsEmpty(FormValue.Name)){
            ErrorToast("Expense Type Name Required !")
        }
        else {
            let result = await CreateExpenseTypeRequest(FormValue,ObjectID)
            if(result.status){
                navigate("/ExpenseTypeListPage")
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
                                        ? <h5>Edit Expense Type</h5>
                                        : <h5>Create Expense Type</h5>
                                }
                                <hr className='bg-light'/>
                                {
                                    ObjectID !== 0
                                        ?
                                        <div className='col-12 col-sm-4 p-2'>
                                            <label className='form-label'>Expens Type ID</label>
                                            <input value={ObjectID} readOnly={true} className='form-control form-control-sm' type='text' />
                                        </div>
                                        : ""
                                }
                                <div className="col-12 col-sm-4 p-2">
                                    <label className="form-label">Expense Type Name</label>
                                    <input onChange={(e)=>{store.dispatch(OnChangeExpenseTypeInput({Name:"Name",Value:e.target.value}))}} value={FormValue.Name} className="form-control form-control-sm" type="text"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 col-md-4 p-2">
                                    <button onClick={SaveChange} className="btn px-2 my-2 text-xs btn-success">{ObjectID!==0 ? "Save Change" : "Create"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseTypeCreateUpdate;