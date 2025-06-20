import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
import CreatePassword from "../../components/Users/CreatePassword.jsx";

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