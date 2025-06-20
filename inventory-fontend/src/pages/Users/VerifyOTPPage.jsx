import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import VerifyOtp from "../../components/Users/VerifyOTP.jsx";

const VerifyOtpPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>} >
                <VerifyOtp/>
            </Suspense>
        </Fragment>
    );
};

export default VerifyOtpPage;