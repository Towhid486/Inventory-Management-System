import React, {Fragment, useEffect, useRef} from 'react';
import {CreateSaleRequest, CustomerDropDownRequest, ProductDropDownRequest} from "../../APIRequest/SaleAPIRequest";
import {useSelector} from "react-redux";
import {ErrorToast, IsEmpty, SuccessToast} from "../../helper/FormHelper";
import store from "../../redux/store/store";
import {
    OnChangeSaleInput,
    RemoveSaleItem,
    ResetSaleFormValue, ResetSaleItem,
    SetSaleItemList,
} from "../../redux/state-slice/sale-slice";
import {BsCartCheck, BsTrash} from "react-icons/bs";
import {useNavigate} from "react-router-dom";



const SalesCreateUpdate = () => {
    
    let productRef,qtyRef,unitPriceRef=useRef();
    let navigate = useNavigate()
    
    useEffect(()=>{
        (async () => {
            await CustomerDropDownRequest();
            await ProductDropDownRequest();
        })();
    },[])
    
    
    let CustomerDropDown=useSelector((state)=>(state.sale.CustomerDropDown));
    let ProductDropDown=useSelector((state)=>(state.sale.ProductDropDown));
    let SaleItemList=useSelector((state)=>(state.sale.SaleItemList));
    let SaleFormValue=useSelector((state)=>(state.sale.SaleFormValue));
    
    const OnAddCart = () => {
        let productValue=productRef.value;
        let productName=productRef.selectedOptions[0].text;
        let qtyValue=qtyRef.value;
        let unitPriceValue=unitPriceRef.value;
        
        if(IsEmpty(productValue)){
            ErrorToast("Select Product")
        }
        else if(IsEmpty(qtyValue)){
            ErrorToast("Qty Required")
        }
        else if(IsEmpty(unitPriceValue)){
            ErrorToast("Unit Price Required")
        }
        else {
            let item= {
                "ProductID":productValue,
                "ProductName":productName,
                "Qty":qtyValue,
                "UnitCost":unitPriceValue,
                "Total":(parseInt(qtyValue))*(parseInt(unitPriceValue))
            }
            store.dispatch(SetSaleItemList(item))
        }
        
    }
    
    
    const removeCart = (i) => {
        store.dispatch(RemoveSaleItem(i))
    }
    
    
    const CreateNewSale=async () => {
        // Apply Validation
        if (IsEmpty(SaleFormValue.CustomerID)) {
            ErrorToast("Select Customer !")
        } else if (IsEmpty(SaleFormValue.VatTax)) {
            ErrorToast("VAT/Taxs Required !")
        } else if (IsEmpty(SaleFormValue.Discount)) {
            ErrorToast("Discount Required !")
        } else if (IsEmpty(SaleFormValue.OtherCost)) {
            ErrorToast("OtherCost Required !")
        } else if (IsEmpty(SaleFormValue.ShippingCost)) {
            ErrorToast("ShippingCost Required !")
        } else if (IsEmpty(SaleFormValue.GrandTotal)) {
            ErrorToast("GrandTotal Required !")
        } else if (IsEmpty(SaleFormValue.Note)) {
            ErrorToast("Note Required !")
        } else if (SaleItemList.length<=0) {
            ErrorToast("You haven't added any product on cart!")
        }else{
            let Result= await CreateSaleRequest(SaleFormValue, SaleItemList);
            if(Result.status){
                SuccessToast(Result.message)
                store.dispatch(ResetSaleItem())
                store.dispatch(ResetSaleFormValue())
                navigate('/SalesListPage')
            }
        }
    }
    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row">
                                    <h5 >Create Sales</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-12 p-1">
                                        <label className="form-label">Customer</label>
                                        <select onChange={(e)=>{store.dispatch(OnChangeSaleInput({Name:"CustomerID",Value:e.target.value}))}} className="form-select form-select-sm">
                                            <option value="">Select Customer</option>
                                            {
                                                CustomerDropDown.map((item,i)=>{
                                                    return( <option key={i} value={item._id}>{item.CustomerName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    
                                    <div className="col-12 p-1">
                                        <label className="form-label">Vat/Tax</label>
                                        <input onChange={(e)=>{store.dispatch(OnChangeSaleInput({Name:"VatTax",Value:e.target.value}))}} className="form-control form-control-sm" type="number"/>
                                    </div>
                                    
                                    <div className="col-12 p-1">
                                        <label className="form-label">Discount</label>
                                        <input onChange={(e)=>{store.dispatch(OnChangeSaleInput({Name:"Discount",Value:e.target.value}))}} className="form-control form-control-sm" type="number"/>
                                    </div>
                                    
                                    <div className="col-12 p-1">
                                        <label className="form-label">Other Cost</label>
                                        <input  onChange={(e)=>{store.dispatch(OnChangeSaleInput({Name:"OtherCost",Value:e.target.value}))}} className="form-control form-control-sm" type="number"/>
                                    </div>
                                    
                                    <div className="col-12 p-1">
                                        <label className="form-label">Shipping Cost</label>
                                        <input onChange={(e)=>{store.dispatch(OnChangeSaleInput({Name:"ShippingCost",Value:e.target.value}))}}  className="form-control form-control-sm" type="number"/>
                                    </div>
                                    
                                    <div className="col-12 p-1">
                                        <label className="form-label">Grand Total</label>
                                        <input onChange={(e)=>{store.dispatch(OnChangeSaleInput({Name:"GrandTotal",Value:e.target.value}))}}  className="form-control form-control-sm" type="number"/>
                                    </div>
                                    
                                    
                                    <div className="col-12 p-1">
                                        <label className="form-label">Note</label>
                                        <input  onChange={(e)=>{store.dispatch(OnChangeSaleInput({Name:"Note",Value:e.target.value}))}}  className="form-control form-control-sm" type="text"/>
                                    </div>
                                
                                
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={CreateNewSale} className="btn btn-sm my-3 btn-success">Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-8 mb-3">
                        <div className="card  h-100">
                            <div className="card-body">
                                
                                <div className="row">
                                    <div className="col-6  p-1">
                                        <label className="form-label">Select Product</label>
                                        <select ref={(input)=>productRef=input} className="form-select form-select-sm">
                                            <option value="">Select Product</option>
                                            {
                                                ProductDropDown.map((item,i)=>{
                                                    return( <option key={i.toLocaleString()} value={item._id}>{item.Name}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-6 col-md-2 p-1">
                                        <label className="form-label">Qty</label>
                                        <input ref={(input)=>qtyRef=input}  className="form-control form-control-sm" />
                                    </div>
                                    <div className="col-6 col-md-2 p-1">
                                        <label className="form-label">Unit Price</label>
                                        <input ref={(input)=>unitPriceRef=input} className="form-control form-control-sm" />
                                    </div>
                                    <div className="col-6 col-md-2 p-1">
                                        <label className="form-label">Add to cart</label>
                                        <button onClick={OnAddCart} className="btn w-100 btn-success btn-sm"><BsCartCheck/></button>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-12">
                                        <div className="table-responsive table-section">
                                            <table className="table-sm text-center table">
                                                <thead className="sticky-top bg-white">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Qty</th>
                                                    <th>Unit Price</th>
                                                    <th>Total</th>
                                                    <th>Remove</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    SaleItemList.map((item,i)=>{
                                                        return(
                                                            <tr key={i}>
                                                                <td>{item.ProductName}</td>
                                                                <td>{item.Qty}</td>
                                                                <td>{item.UnitCost}</td>
                                                                <td>{item.Total}</td>
                                                                <td><button onClick={()=>removeCart(i)} className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2"><BsTrash/></button></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
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

export default SalesCreateUpdate;