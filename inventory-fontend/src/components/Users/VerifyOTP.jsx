import React, {Fragment, useState} from 'react';
import ReactCodeInput from "react-code-input";
import {ErrorToast} from "../../helper/FormHelper.js";
import {RecoverVerifyOTPRequest} from "../../APIRequest/APIRequest.js";
import {getEmail} from "../../helper/SessionHelper.js";
import {useNavigate} from "react-router-dom";

const VerifyOTP = () => {
    let navigate = useNavigate()
    let  defaultInputStyle = {
        fontFamily:"monospace",
        MozAppearance:'textField',
        margin:'4px',
        paddingLeft:'8px',
        width:'45px',
        borderRadius:'3px',
        height:'45px',
        fontSize:'32px',
        border:'1px solid lightskyblue',
        boxSizing:'border-box',
        color:'black',
        backgroundColor:'white',
        borderColor:'lightgrey'
    }

    let [OTP,setOTP] = useState("")
    let email = getEmail()

    const SubmitOTP = async () => {
        if (OTP.length === 6) {
            let data = await RecoverVerifyOTPRequest(email,OTP)
            if (data.status) {
                navigate('/ResetPassword')
            }
        } else {
            ErrorToast("Enter 6 Digit Code")
        }
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-75 p-4">
                            <div className="card-body text-start">
                                <h4 className='fw-semibold'>OTP Verification</h4>
                                <p>A 6 Digit Verification code has been sent to your email address.</p>
                                <ReactCodeInput onChange={(value)=>setOTP(value)} inputStyle={defaultInputStyle} fields={6} />
                                <br />
                                <br />
                                <button onClick={SubmitOTP} className="btn w-100 animated fadeInUp float-end Btn-bg">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default VerifyOTP;