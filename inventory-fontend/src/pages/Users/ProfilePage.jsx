import React, {useEffect, useRef} from 'react';
import {GetProfileDetailsRequest, ProfileUpdateRequest, RegistrationRequest} from "../../APIRequest/APIRequest.js";
import {useSelector} from "react-redux";
import {ErrorToast, getBase64, IsEmail, IsEmpty, IsMobile, SuccessToast} from "../../helper/FormHelper.js";
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {
    let emailRef,firstNameRef,lastNameRef,mobileRef,passwordRef,userImgRef,userImgView = useRef()
    let navigate = useNavigate()
    useEffect(() => {
       GetProfileDetailsRequest()
    }, []);

    const ProfileData = useSelector((state) => state.profile.value)

    const PreviewImage = async () => {
            let ImgFile = userImgRef.files[0];
            if (ImgFile) {
                const base64Img = await getBase64(ImgFile);
                userImgView.src = base64Img;
            }
    }

    const UpdateProfile = async () => {
        let email = emailRef.value;
        let firstName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let mobile = mobileRef.value;
        let password = passwordRef.value;
        let photo = userImgView.src

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
            let data = await ProfileUpdateRequest(email, firstName, lastName, mobile, password, photo)
            if (data?.status) {
                SuccessToast(data?.message)
                navigate('/')
            }
        }
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div key={Date.now()} className="container-fluid">
                                <img ref={(input) => (userImgView = input)} className="icon-nav-img-lg" src={ProfileData?.photo} alt=""/>
                                <hr />
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Profile Picture</label>
                                        <input onChange={PreviewImage} ref={(input) => (userImgRef = input)} placeholder="User Image" className="form-control animated fadeInUp" type="file" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Email Address</label>
                                        <input defaultValue={ProfileData?.email} readOnly={true} ref={(input) => (emailRef = input)} placeholder="User Email" className="form-control bg-dark-subtle animated fadeInUp" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>First Name</label>
                                        <input defaultValue={ProfileData?.firstName} ref={(input) => (firstNameRef = input)} placeholder="First Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Last Name</label>
                                        <input defaultValue={ProfileData?.lastName} ref={(input) => (lastNameRef = input)} placeholder="Last Name" className="form-control animated fadeInUp" type="text" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Mobile</label>
                                        <input defaultValue={ProfileData?.mobile} ref={(input) => (mobileRef = input)} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Password</label>
                                        <input  defaultValue={ProfileData?.password} ref={(input) => (passwordRef = input)} placeholder="User Password" className="form-control animated fadeInUp" type="password" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <button onClick={UpdateProfile} className="btn w-100 float-end Btn-bg animated fadeInUp">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProfilePage;