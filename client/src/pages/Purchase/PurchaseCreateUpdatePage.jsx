import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import PurchaseCreateUpdate from "../../components/Purchase/PurchaseCreateUpdate.jsx";

const PurchaseCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <PurchaseCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PurchaseCreateUpdatePage;