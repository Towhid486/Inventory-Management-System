import React, {Fragment, useRef} from 'react';
import {Link} from "react-router-dom";
import {ErrorToast, IsEmail, IsEmpty} from "../../helper/FormHelper.js";
import {LoginRequest} from "../../APIRequest/APIRequest.js";

const Login = () => {
    let passRef,emailRef = useRef();

    const SubmitLogin = async () => {
        let email = emailRef.value;
        let pass = passRef.value;
        if(!IsEmail(email)) {
            ErrorToast("Invalid Email Address")
        }
        else if(IsEmpty(pass)){
            ErrorToast("Password Required")
        }
        else{
            let data = await LoginRequest(email,pass)
            if (data.status) {
                window.location.href="/"
            }
        }
    }
    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-75 p-4 shadow border-0 rounded-4">
                            <div className="card-body">
                                <h5 className='fw-bold text-start'>SIGN IN</h5>
                                <br/>
                                <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <input ref={(input)=>passRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <button onClick={SubmitLogin} className="btn w-100 animated fadeInUp float-end Btn-bg mb-3 fw-semibold">Next</button>
                                <div className="d-flex w-100 justify-content-end">
                                    <Link className="text-center text-light-emphasis animated fadeInUp fw-semibold px-2 border-end border-2 border-dark-subtle" to="/registration">Sign Up</Link>
                                    <br/>
                                    <Link className="text-center text-light-emphasis animated fadeInUp fw-semibold px-2" to="/forgetpass">Forget Password</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
