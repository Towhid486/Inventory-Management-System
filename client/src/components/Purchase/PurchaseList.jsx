import React, {Fragment, useEffect, useState} from 'react';
import {PurchaseListRequest} from "../../APIRequest/PurchaseAPIRequest";
import {useSelector} from "react-redux";
import {AiOutlineEye} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import {Link} from "react-router-dom";

const PurchaseList = () => {
    let [searchKeyword,setSearchKeyword]=useState("0");
    let [perPage,setPerPage]=useState(20);
    
    useEffect(()=>{
        (async () => {
            await PurchaseListRequest(1,perPage,searchKeyword);
        })();
    },[])
    
    let DataList=useSelector((state)=>(state.purchase.List));
    let Total=useSelector((state)=>(state.purchase.ListTotal))
    
    const handlePageClick = async (event) => {
        await PurchaseListRequest(event.selected + 1, perPage, searchKeyword)
    };
    const searchData=async () => {
        await PurchaseListRequest(1, perPage, searchKeyword)
    }
    const perPageOnChange=async (e) => {
        setPerPage(parseInt(e.target.value))
        await PurchaseListRequest(1, e.target.value, searchKeyword)
    }
    const searchKeywordOnChange=async (e) => {
        setSearchKeyword(e.target.value)
        if ((e.target.value).length === 0) {
            setSearchKeyword("0")
            await PurchaseListRequest(1, perPage, "0")
        }
    }
    
    const TextSearch = (e) => {
        const rows = document.querySelectorAll('tbody tr')
        rows.forEach(row => {
            row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
        })
    }
    // const DetailsPopUp = (id) => {
    //
    // }
    
    return (
        <Fragment>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid padding-0">
                                    <div className="row">
                                        <div className="col-12">
                                            <h5>Purchase List</h5>
                                        </div>
                                        
                                        <div className="col-6 col-md-2 pt-2">
                                            <Link to={'/PurchaseCreateUpdatePage'} className="btn px-3 px-lg-4 btn-success text-xxs" >Create New</Link>
                                        </div>
                                        
                                        <div className="col-6 col-md-2 pt-2">
                                            <input onKeyUp={TextSearch} placeholder="Text Filter" className="form-control form-control-sm"/>
                                        </div>
                                        
                                        <div className="col-12 col-md-2 pt-2">
                                            <select onChange={perPageOnChange} className="form-control form-select-sm form-select form-control-sm" >
                                                <option value="20">20 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                                <option value="100">200 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-5 pt-2">
                                            <div className="input-group mb-3">
                                                <input onChange={searchKeywordOnChange} type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                <button onClick={searchData} className="btn  btn-success btn-sm mb-0" type="button">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Supplier</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Grand Total</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shipping Cost</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Vat/Tax</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Other Cost</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Discount</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date</td>
                                                        {/*<td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>*/}
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        DataList.map((item,i)=>
                                                            <tr key={i}>
                                                                <td>
                                                                    <p className="text-xs text-start">{item.suppliers[0]['SupplierName']}</p>
                                                                </td>
                                                                
                                                                <td>
                                                                    <p className="text-xs text-start">
                                                                        <CurrencyFormat value={item.GrandTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                    </p>
                                                                </td>
                                                                
                                                                <td>
                                                                    <p className="text-xs text-start">
                                                                        <CurrencyFormat value={item.ShippingCost} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                    </p>
                                                                </td>
                                                                
                                                                <td>
                                                                    <p className="text-xs text-start">
                                                                        <CurrencyFormat value={item.VatTax} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                    </p>
                                                                </td>
                                                                
                                                                <td>
                                                                    <p className="text-xs text-start">
                                                                        <CurrencyFormat value={item.OtherCost} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                    </p>
                                                                </td>
                                                                
                                                                <td>
                                                                    <p className="text-xs text-start">
                                                                        <CurrencyFormat value={item.Discount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                    </p>
                                                                </td>
                                                                
                                                                
                                                                <td>
                                                                    <p className="text-xs text-start">{moment(item.CreatedDate).format('MMMM Do YYYY')}</p>
                                                                </td>
                                                                
                                                                {/*<td>*/}
                                                                {/*    <button onClick={()=>DetailsPopUp(item._id)} className="btn btn-outline-light text-success p-2 mb-0 btn-sm ms-2">*/}
                                                                {/*        <AiOutlineEye size={15} />*/}
                                                                {/*    </button>*/}
                                                                {/*</td>*/}
                                                            </tr>
                                                        )
                                                    }
                                                    
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5">
                                            <nav aria-label="Page navigation example">
                                                <ReactPaginate
                                                    previousLabel="<"
                                                    nextLabel=">"
                                                    pageClassName="page-item"
                                                    pageLinkClassName="page-link"
                                                    previousClassName="page-item"
                                                    previousLinkClassName="page-link"
                                                    nextClassName="page-item"
                                                    nextLinkClassName="page-link"
                                                    breakLabel="..."
                                                    breakClassName="page-item"
                                                    breakLinkClassName="page-link"
                                                    pageCount={Total/perPage}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={handlePageClick}
                                                    containerClassName="pagination"
                                                    activeClassName="active"
                                                />
                                            </nav>
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

export default PurchaseList;