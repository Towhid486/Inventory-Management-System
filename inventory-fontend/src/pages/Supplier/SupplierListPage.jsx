import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/Master-Layout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import SupplierList from "../../components/Supplier/SupplierList.jsx";

const SupplierListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <SupplierList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SupplierListPage;