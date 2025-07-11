import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {CreateUpdateBrandRequest, FillBrandFormRequest} from "../../APIRequest/BrandAPIRequest";
import {ErrorToast, IsEmpty} from "../../helper/FormHelper";
import store from "../../redux/store/store";
import {OnChangeBrandInput, ResetBrandFormValue} from "../../redux/state-slice/brand-slice";

const BrandCreateUpdate = () => {
    
    let FormValue=useSelector((state)=>(state.brand.FormValue));
    let navigate=useNavigate();
    let [ObjectID,SetObjectID]=useState(0);
    
    useEffect(()=>{
        let params= new URLSearchParams(window.location.search);
        let id=params.get('id');
        if(id!==null){
            SetObjectID(id);
            (async () => {
                await FillBrandFormRequest(id);
            })();
        }else{
            store.dispatch(ResetBrandFormValue())
        }
    },[])
    
    
    const SaveChange = async () => {
        if(IsEmpty(FormValue.Name)){
            ErrorToast("Brand Name is Empty !")
        }
        else {
            let Result = await CreateUpdateBrandRequest(FormValue,ObjectID)
            if(Result.status){
                navigate("/BrandListPage")
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
                                        ? <h5>Edit Brand</h5>
                                        : <h5>Create Brand</h5>
                                }
                                <hr className='bg-light'/>
                                {
                                    ObjectID !== 0
                                        ?
                                        <div className='col-12 col-md-4 p-2'>
                                            <label className='form-label'>Brand ID</label>
                                            <input value={ObjectID} readOnly={true} className='form-control form-control-sm' type='text' />
                                        </div>
                                        : ""
                                }
                                <div className="col-12 col-md-4 p-2">
                                    <label className="form-label">Brand Name</label>
                                    <input onChange={(e)=>{store.dispatch(OnChangeBrandInput({Name:"Name",Value:e.target.value}))}} value={FormValue.Name} className="form-control form-control-sm" type="text"/>
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

export default BrandCreateUpdate;