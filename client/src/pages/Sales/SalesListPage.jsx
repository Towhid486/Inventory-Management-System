import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import SalesList from "../../components/Sales/SalesList.jsx";

const SalesListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <SalesList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SalesListPage;