import React, {Fragment, Suspense} from 'react';
import CreatePassword from "../../components/Users/CreatePassword.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";

const CreatePasswordPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>} >
                <CreatePassword/>
            </Suspense>
        </Fragment>
    );
};

export default CreatePasswordPage;