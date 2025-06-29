import React, {Fragment, Suspense} from 'react';
import SendOTP from "../../components/Users/SendOTP.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";

const SendOTPPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>} >
                <SendOTP/>
            </Suspense>
        </Fragment>
    );
};

export default SendOTPPage;