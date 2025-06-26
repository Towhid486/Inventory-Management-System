import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/Master-Layout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import CustomerList from "../../components/Customer/CustomerList.jsx";

const CustomerListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <CustomerList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CustomerListPage;