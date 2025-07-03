import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import ReactPaginate from "react-paginate";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {Link} from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import {DeleteExpenseRequest, ExpensesListRequest} from "../../APIRequest/ExpenseAPIRequest.js";
import {DeleteAlert} from "../../helper/DeleteAlert.js";

const ExpenseList = () => {
    
    let [searchKeyword,setSearchKeyword] = useState("0");
    let [perPage,setPerPage] = useState(20);
    
    useEffect(()=>{
        (async () => {
            await ExpensesListRequest(1,perPage,searchKeyword);
        })();
    },[])
    
    let DataList = useSelector((state)=>(state.expense.List))
    let Total = useSelector((state)=>(state.expense.ListTotal))
    
    const handlePageClick = async (event) => {
        await ExpensesListRequest(event.selected + 1, perPage, searchKeyword)
    };
    const searchData=async () => {
        await ExpensesListRequest(1, perPage, searchKeyword)
    }
    const perPageOnChange=async (e) => {
        setPerPage(parseInt(e.target.value))
        await ExpensesListRequest(1, e.target.value, searchKeyword)
    }
    const searchKeywordOnChange=async (e) => {
        setSearchKeyword(e.target.value)
        if ((e.target.value).length === 0) {
            setSearchKeyword("0")
            await ExpensesListRequest(1, perPage, "0")
        }
    }
    
    const TextSearch = (e) => {
        const rows = document.querySelectorAll('tbody tr')
        rows.forEach(row => {
            row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
        })
    }
    
    
    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed){
            let DeleteResult= await DeleteExpenseRequest(id)
            if(DeleteResult){
                await ExpensesListRequest(1,perPage,searchKeyword);
            }
        }
    }
    
    
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
                                            <h5 className="mb-3">Expenses List</h5>
                                        </div>
                                        
                                        <div className="col-6 col-md-3 pt-2">
                                            <Link to={'/ExpenseCreateUpdatePage'} className="btn px-3 px-lg-4 btn-success text-xxs" >Create New</Link>
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
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#No</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Type</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Amount</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Note</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        DataList.map((item,i)=>
                                                            <tr key={i}>
                                                                <td><p className="text-xs text-start">{i+1}</p></td>
                                                                <td><p className="text-xs text-start">{item.Type[0]?item.Type[0]['Name']:""}</p></td>
                                                                <td><p className="text-xs text-start">
                                                                    <CurrencyFormat value={item.Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </p></td>
                                                                <td><p className="text-xs text-start">{item.Note}</p></td>
                                                                <td>
                                                                    <Link to={`/ExpenseCreateUpdatePage?id=${item._id}`} className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                        <AiOutlineEdit size={15} />
                                                                    </Link>
                                                                    <button onClick={()=>DeleteItem(item._id)} className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                                                        <AiOutlineDelete size={15} />
                                                                    </button>
                                                                </td>
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

export default ExpenseList;