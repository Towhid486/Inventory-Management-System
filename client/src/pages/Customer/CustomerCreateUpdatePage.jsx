import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import CustomerCreateUpdate from "../../components/Customer/CustomerCreateUpdate.jsx";

const CustomerCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <CustomerCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CustomerCreateUpdatePage;