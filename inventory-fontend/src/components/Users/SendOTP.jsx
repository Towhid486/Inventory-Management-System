import React, {Fragment, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {ErrorToast, IsEmail} from "../../helper/FormHelper.js";
import {RecoverVerifyEmailRequest} from "../../APIRequest/UsersAPIRequest.js";

const SendOTP = () => {

    let emailRef = useRef()
    let navigate = useNavigate()

    const VerifyEmail = async () => {
        let email = emailRef.value;
        if (!IsEmail(email)) {
            ErrorToast("Valid Email Address Required")
        } else {
            let data = await RecoverVerifyEmailRequest(email)
            if (data.status) {
                navigate('/VerifyOTP')
            }
        }
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-75 p-4">
                            <div className="card-body text-start">
                                <h4 className='fw-semibold'>EMAIL ADDRESS</h4>
                                <br />
                                <label>Enter email address</label>
                                <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email" />
                                <br />
                                <button onClick={VerifyEmail} className="btn w-100 animated fadeInUp float-end Btn-bg">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SendOTP;