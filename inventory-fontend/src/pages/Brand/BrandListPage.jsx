import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/Master-Layout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import BrandList from "../../components/Brand/BrandList.jsx";

const BrandListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <BrandList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};
export default BrandListPage;