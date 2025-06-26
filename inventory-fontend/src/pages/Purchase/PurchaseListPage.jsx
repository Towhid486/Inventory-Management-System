import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/Master-Layout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import PurchaseList from "../../components/Purchase/PurchaseList.jsx";

const PurchaseListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <PurchaseList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PurchaseListPage;