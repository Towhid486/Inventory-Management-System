import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
const Registration = lazy(() => import("../../components/Users/Registration.jsx"));

const RegistrationPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>} >
                <Registration/>
            </Suspense>
        </Fragment>
    );
};

export default RegistrationPage;