import React, {useEffect, useState} from 'react';
import store from "../../redux/store/store";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ErrorToast, IsEmpty} from "../../helper/FormHelper";
import {CreateUpdateCategoryRequest, FillCategoryFormRequest} from "../../APIRequest/CategoryAPIRequest";
import {OnChangeCategoryInput, ResetCategoryFormValue} from "../../redux/state-slice/category-slice";

const CategoryCreateUpdate = () => {
    
    
    let FormValue=useSelector((state)=>(state.category.FormValue));
    let navigate=useNavigate();
    let [ObjectID,SetObjectID]=useState(0);
    
    useEffect(()=>{
        let params= new URLSearchParams(window.location.search);
        let id=params.get('id');
        if(id!==null){
            SetObjectID(id);
            (async () => {
                await FillCategoryFormRequest(id);
            })();
        }else{
            store.dispatch(ResetCategoryFormValue())
        }
    },[])
    
    
    const SaveChange = async () => {
        if(IsEmpty(FormValue.Name)){
            ErrorToast("Category Name is Empty !")
        }
        else {
            if(await CreateUpdateCategoryRequest(FormValue,ObjectID)){
                navigate("/CategoryListPage")
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
                                        ? <h5>Edit Category</h5>
                                        : <h5>Create Category</h5>
                                }
                                <hr className='bg-light'/>
                                {
                                    ObjectID !== 0
                                        ?
                                        <div className='col-12 col-md-4 p-2'>
                                            <label className='form-label'>Category ID</label>
                                            <input value={ObjectID} readOnly={true} className='form-control form-control-sm' type='text' />
                                        </div>
                                        : ""
                                }
                                <div className="col-12 col-md-4 p-2">
                                    <label className="form-label">Category Name</label>
                                    <input onChange={(e)=>{store.dispatch(OnChangeCategoryInput({Name:"Name",Value:e.target.value}))}} value={FormValue.Name} className="form-control form-control-sm" type="text"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 p-2">
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

export default CategoryCreateUpdate;