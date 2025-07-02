import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import SalesCreateUpdate from "../../components/Sales/SalesCreateUpdate.jsx";

const SalesCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <SalesCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SalesCreateUpdatePage;