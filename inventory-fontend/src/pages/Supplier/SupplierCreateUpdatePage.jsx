import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/Master-Layout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import SupplierCreateUpdate from "../../components/Supplier/SupplierCreateUpdate.jsx";

const SupplierCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <SupplierCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SupplierCreateUpdatePage;