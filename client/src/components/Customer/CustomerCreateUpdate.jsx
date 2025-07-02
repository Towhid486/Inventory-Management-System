import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import store from "../../redux/store/store.js";
import {OnChangeCustomerInput, ResetFormValue} from "../../redux/state-slice/customer-slice.js";
import {CreateUpdateCustomerRequest, FillCustomerFormRequest} from "../../APIRequest/CustomerAPIRequest.js";
import {IsEmpty, ErrorToast, IsEmail, IsMobile} from "../../helper/FormHelper.js";
import {useNavigate} from "react-router-dom";

const CustomerCreateUpdate = () => {
    let FormValue = useSelector((state)=>(state.customer.FormValue))
    let navigate = useNavigate()
    let [ObjectID,SetObjectID]=useState(0);
    
    
    useEffect(() => {
        let params = new URLSearchParams(window.location.search)
        let id = params.get('id')
        if(id!==null){
            SetObjectID(id);
            (async()=>{
                await FillCustomerFormRequest(id);
            })()
        }else{
            store.dispatch(ResetFormValue())
        }
    }, []);
    
    const SaveChange = async () => {
        if (IsEmpty(FormValue.CustomerName)) {
            ErrorToast("Customer Name Required !")
        } else if (!IsMobile(FormValue.Phone)) {
            ErrorToast("Valid Phone Number Required !")
        } else if (!IsEmail(FormValue.Email)) {
            ErrorToast("Valid Email Address Required !")
        } else if (IsEmpty(FormValue.Address)) {
            ErrorToast("Customer Address Required !")
        } else {
            let result = await CreateUpdateCustomerRequest(FormValue,ObjectID)
            if(result.status){
                navigate("/CustomerListPage")
            }
        }
    }
    
    return (
        <Fragment>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    {
                                        ObjectID !== 0
                                        ? <h5>Edit Customer</h5>
                                        : <h5>Create Customer</h5>
                                    }
                                    <hr className='bg-light'/>
                                    {
                                        ObjectID !== 0
                                            ?
                                            <div className='col-12 col-md-4 p-2'>
                                                <label className='form-label'>Customer ID</label>
                                                <input value={ObjectID} readOnly={true} className='form-control form-control-sm' type='text' />
                                            </div>
                                            : ""
                                    }
                                    <div className='col-12 col-md-4 p-2'>
                                        <label className='form-label'>Customer Name</label>
                                        <input onChange={(e)=>{store.dispatch(OnChangeCustomerInput({Name:"CustomerName",Value:e.target.value}))}} value={FormValue.CustomerName} className='form-control form-control-sm' type='text' />
                                    </div>
                                    <div className='col-12 col-md-4 p-2'>
                                        <label className='form-label'>Mobile No</label>
                                        <input onChange={(e)=>{store.dispatch(OnChangeCustomerInput({Name:"Phone",Value:e.target.value}))}} value={FormValue.Phone} className='form-control form-control-sm' type='text' />
                                    </div>
                                    <div className='col-12 col-md-4 p-2'>
                                        <label className='form-label'>Email</label>
                                        <input onChange={(e)=>{store.dispatch(OnChangeCustomerInput({Name:"Email",Value:e.target.value}))}} value={FormValue.Email} className='form-control form-control-sm' type='text' />
                                    </div>
                                    <div className='col-12 col-md-4 p-2'>
                                        <label className='form-label'>Address</label>
                                        <input onChange={(e)=>{store.dispatch(OnChangeCustomerInput({Name:"Address",Value:e.target.value}))}} value={FormValue.Address} className='form-control form-control-sm' type="text" />
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
        </Fragment>
    );
};

export default CustomerCreateUpdate;