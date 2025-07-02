import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import SaleReport from "../../components/Report/SaleReport.jsx";

const SaleReportPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <SaleReport/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SaleReportPage;