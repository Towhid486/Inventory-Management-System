import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import ReturnCreateUpdate from "../../components/Return/ReturnCreateUpdate.jsx";

const ReturnCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <ReturnCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ReturnCreateUpdatePage;