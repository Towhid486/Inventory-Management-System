import React, {useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {ErrorToast, IsEmail, IsEmpty, IsMobile} from "../../helper/FormHelper.js";
import {RegistrationRequest} from "../../APIRequest/UsersAPIRequest.js";

const Registration = () => {
    let emailRef,firstNameRef,lastNameRef,mobileRef,passwordRef = useRef()
    let navigate = useNavigate()

    const onRegistration = async () => {
        let email = emailRef.value;
        let firstName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let mobile = mobileRef.value;
        let password = passwordRef.value;
        let photo = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNCAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzc5MTVfMTIzNykiPgo8cGF0aCBkPSJNNy4wOTg4OCA3LjEwMDFDOC43ODMzOCA3LjEwMDEgMTAuMTQ4OSA1LjczNDU0IDEwLjE0ODkgNC4wNTAwNUMxMC4xNDg5IDIuMzY1NTUgOC43ODMzOCAxIDcuMDk4ODggMUM1LjQxNDM5IDEgNC4wNDg4MyAyLjM2NTU1IDQuMDQ4ODMgNC4wNTAwNUM0LjA0ODgzIDUuNzM0NTQgNS40MTQzOSA3LjEwMDEgNy4wOTg4OCA3LjEwMDFaIiBzdHJva2U9IiNBQkFCQUIiIHN0cm9rZS13aWR0aD0iMS4yNSIvPgo8cGF0aCBkPSJNMTMuMTk4MyAxMy4xOTkzQzEzLjIwMDIgMTMuMDc0MSAxMy4yMDAyIDEyLjk0NjkgMTMuMjAwMiAxMi44MThDMTMuMjAwMiAxMC45MjMgMTAuNDY5MSA5LjM4NjcyIDcuMTAwMSA5LjM4NjcyQzMuNzMxMTEgOS4zODY3MiAxIDEwLjkyMyAxIDEyLjgxOEMxIDE0LjcxMzEgMSAxNi4yNDkzIDcuMTAwMSAxNi4yNDkzQzguODAxMjYgMTYuMjQ5MyAxMC4wMjggMTYuMTI5OCAxMC45MTI3IDE1LjkxNjQiIHN0cm9rZT0iI0FCQUJBQiIgc3Ryb2tlLXdpZHRoPSIxLjI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF83OTE1XzEyMzciPgo8cmVjdCB3aWR0aD0iMTQiIGhlaWdodD0iMTciIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg=="
        console.log(mobile)
        if (!IsEmail(email)) {
            ErrorToast("Valid Email Address Required")
        } else if (IsEmpty(firstName)) {
            ErrorToast("First Name Required !")
        } else if (IsEmpty(lastName)) {
            ErrorToast("Last Name Required !")
        } else if (!IsMobile(mobile)) {
            ErrorToast("Valid Mobile Required !")
        } else if (IsEmpty(password)) {
            ErrorToast("Password Required !")
        } else {
            let data = await RegistrationRequest(email, firstName, lastName, mobile, password, photo)
            if (data.status) {
                navigate('/login')
            }
        }

    }
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-10 center-screen">
                    <div className="card animated fadeIn w-100 p-3 shadow border-0 rounded-4">
                        <div className="card-body text-start">
                            <h3 className="fw-bold">Sign Up</h3>
                            <br />
                            <div className='row'>
                                <div className='col-lg-4 col-md-6 col-12'>
                                    <label>Email Address</label>
                                    <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email" />
                                    <br />
                                </div>
                                <div className='col-lg-4 col-md-6 col-12'>
                                    <label>First Name</label>
                                    <input ref={(input)=>firstNameRef=input} placeholder="First Name" className="form-control animated fadeInUp" type="text" />
                                    <br />
                                </div>
                                <div className='col-lg-4 col-md-6 col-12'>
                                    <label>Last Name</label>
                                    <input ref={(input)=>lastNameRef=input} placeholder="Last Name" className="form-control animated fadeInUp" type="text" />
                                    <br />
                                </div>
                                <div className='col-lg-4 col-md-6 col-12'>
                                    <label>Mobile Number</label>
                                    <input ref={(input)=>mobileRef=input} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile" />
                                    <br />
                                </div>
                                <div className='col-lg-4 col-md-6 col-12'>
                                    <label>Password</label>
                                    <input ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password" />
                                    <br />
                                </div>
                                <div className='row'>
                                    <div className='col-lg-4 col-md-6 col-12'>
                                        <button onClick={onRegistration} className="btn w-100 float-end animated fadeInUp Btn-bg mb-3 fw-semibold">Complete</button>
                                    </div>
                                </div>
                            </div>





                            <div className="d-flex w-100 justify-content-end">
                                <Link className="text-center text-light-emphasis animated fadeInUp fw-semibold px-2 border-end border-2 border-dark-subtle" to="/login">Sign In</Link>
                                <br />
                                <Link className="text-center text-light-emphasis fw-semibold px-2" to="/forgetpass">Forget Password</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
