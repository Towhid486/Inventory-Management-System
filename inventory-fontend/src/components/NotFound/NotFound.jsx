import React from 'react';
import notfound from "../../assets/images/notfound.png"
import logo from "../../assets/images/Logo.svg";
import {Link} from "react-router-dom";
import {RiContractRightLine} from "react-icons/ri";

const NotFound = () => {
    return (
        <div className="container mt-lg-5">
            <div className="row d-flex justify-content-center center-screen">
                <div className="col-md-5 text-center">
                    <h3>404 Nothing found</h3>
                    <img alt="" className="w-75 animated fadeInLeft" src={notfound}/>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                        <img className="logo mx-2" src={logo} alt="logo" />
                        <p className='mb-0 fw-semibold'>Go to <RiContractRightLine/> </p>
                        <Link to={'/'} className="Btn-bg btn fw-semibold m-0">HomePage</Link>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
};

export default NotFound;