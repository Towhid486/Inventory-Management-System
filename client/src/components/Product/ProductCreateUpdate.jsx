import React, {useEffect, useState} from 'react';
import store from "../../redux/store/store";
import {
    CreateUpdateProductRequest,
    FillProductFormRequest,
    ProductBrandDropDownRequest,
    ProductCategoryDropDownRequest
} from "../../APIRequest/ProductAPIRequest";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {OnChangeProductInput, ResetProductFormValue} from "../../redux/state-slice/product-slice";
import {ErrorToast, IsEmpty} from "../../helper/FormHelper";

const ProductCreateUpdate = () => {
    
    let FormValue=useSelector((state)=>(state.product.FormValue));
    let navigate=useNavigate();
    let [ObjectID,SetObjectID]=useState(0);
    
    useEffect(()=>{
        (async () => {
            await ProductBrandDropDownRequest();
            await ProductCategoryDropDownRequest();
        })();
        
        let params= new URLSearchParams(window.location.search);
        let id=params.get('id');
        if(id!==null){
            SetObjectID(id);
            (async () => {
                await FillProductFormRequest(id)
            })();
        }else{
            store.dispatch(ResetProductFormValue())
        }
        
    },[])
    
    
    let ProductBrandDropDown=useSelector((state)=>(state.product.ProductBrandDropDown));
    let ProductCategoryDropDown=useSelector((state)=>(state.product.ProductCategoryDropDown));
    
    
    const SaveChange = async () => {
        if(IsEmpty(FormValue.Name)){
            ErrorToast("Product Name Required !")
        }
        else if(IsEmpty(FormValue.BrandID)){
            ErrorToast("Product Brand Required !")
        }
        else if(IsEmpty(FormValue.CategoryID)){
            ErrorToast("Product Category Required !")
        }
        else if(IsEmpty(FormValue.Unit)){
            ErrorToast("Product Unit Required !")
        }
        
        else {
            let Result = await CreateUpdateProductRequest(FormValue,ObjectID)
            if(Result.status){
                navigate("/ProductListPage")
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
                                        ? <h5>Edit Product</h5>
                                        : <h5>Create Product</h5>
                                }
                                <hr className='bg-light'/>
                                {
                                    ObjectID !== 0
                                        ?
                                        <div className='col-12 col-md-4 p-2'>
                                            <label className='form-label'>Product ID</label>
                                            <input value={ObjectID} readOnly={true} className='form-control form-control-sm' type='text' />
                                        </div>
                                        : ""
                                }
                                <div className="col-12 col-md-4 p-2">
                                    <label className="form-label">Product Name</label>
                                    <input onChange={(e)=>{store.dispatch(OnChangeProductInput({Name:"Name",Value:e.target.value}))}} value={FormValue.Name} className="form-control form-control-sm" type="text"/>
                                </div>
                                
                                
                                <div className="col-6 col-md-4 p-2">
                                    <label className="form-label">Product Brand</label>
                                    <select onChange={(e)=>{store.dispatch(OnChangeProductInput({Name:"BrandID",Value:e.target.value}))}} value={FormValue.BrandID} className="form-select form-select-sm">
                                        <option value="">Select Type</option>
                                        {
                                            ProductBrandDropDown.map((item,i)=>{
                                                return( <option key={i.toLocaleString()} value={item._id}>{item.Name}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                                
                                
                                <div className="col-6 col-md-4 p-2">
                                    <label className="form-label">Product Category</label>
                                    <select onChange={(e)=>{store.dispatch(OnChangeProductInput({Name:"CategoryID",Value:e.target.value}))}} value={FormValue.CategoryID} className="form-select form-select-sm">
                                        <option value="">Select Type</option>
                                        {
                                            ProductCategoryDropDown.map((item,i)=>{
                                                return( <option key={i.toLocaleString()} value={item._id}>{item.Name}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                                
                                
                                <div className="col-6 col-md-4 p-2">
                                    <label className="form-label">Price $</label>
                                    <input onChange={(e)=>{store.dispatch(OnChangeProductInput({Name:"Price",Value:e.target.value}))}} value={FormValue.Price} className="form-control form-control-sm" type="text"/>
                                </div>
                                
                                <div className="col-6 col-md-4 p-2">
                                    <label className="form-label">Unit</label>
                                    <input onChange={(e)=>{store.dispatch(OnChangeProductInput({Name:"Unit",Value:e.target.value}))}} value={FormValue.Unit} className="form-control form-control-sm" type="text"/>
                                </div>
                                
                                <div className="col-12 col-md-6 p-2">
                                    <label className="form-label">Details</label>
                                    <textarea onChange={(e)=>{store.dispatch(OnChangeProductInput({Name:"Details",Value:e.target.value}))}} value={FormValue.Details} className="form-control form-control-sm" rows={4}/>
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

export default ProductCreateUpdate;