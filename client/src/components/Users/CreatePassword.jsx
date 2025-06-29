import React, {Fragment, useRef} from 'react';
import {ErrorToast, IsEmpty} from "../../helper/FormHelper.js";
import {RecoverResetPasswordRequest} from "../../APIRequest/UsersAPIRequest.js";
import {getEmail, getOTP} from "../../helper/SessionHelper.js";
import {useNavigate} from "react-router-dom";

const CreatePassword = () => {
    let navigate = useNavigate()
    let PasswordRef,ConfirmPasswordRef = useRef()
    let email = getEmail();

    const ResetPassword = async () => {
        let Password = PasswordRef.value
        let OTP = getOTP()
        let ConfirmPassword = ConfirmPasswordRef.value;
        if (IsEmpty(Password)) {
            ErrorToast("Password Required")
        } else if (IsEmpty(ConfirmPassword)) {
            ErrorToast("Confirm Password Required")
        } else if (Password !== ConfirmPassword) {
            ErrorToast("Password & Confirm Password Should be same")
        } else {
            let data = await RecoverResetPasswordRequest(email,OTP,Password)
            if (data.status) {
                localStorage.clear()
                navigate('/login')
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
                                <h4 className='fw-semibold'>SET NEW PASSWORD</h4>
                                <br />
                                <label>Your email address</label>
                                <input value={email} placeholder="User Email" readOnly={true} className="form-control animated fadeInUp bg-warning-subtle" type="email" />
                                <br />
                                <label>New Password</label>
                                <input ref={(input)=>PasswordRef=input} placeholder="New password" className="form-control animated fadeInUp" type="password" />
                                <br />
                                <label>Confirm Password</label>
                                <input ref={(input)=>ConfirmPasswordRef=input} placeholder="Confirm password" className="form-control animated fadeInUp" type="password" />
                                <br />
                                <button onClick={ResetPassword} className="btn w-100 animated fadeInUp float-end Btn-bg">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CreatePassword;