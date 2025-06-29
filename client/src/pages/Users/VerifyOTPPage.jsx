import React, {Fragment, Suspense} from 'react';
import VerifyOtp from "../../components/Users/VerifyOTP.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";

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