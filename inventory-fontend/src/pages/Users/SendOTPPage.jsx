import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import SendOTP from "../../components/Users/SendOTP.jsx";

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