import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import ReturnReport from "../../components/Report/ReturnReport.jsx";

const ReturnReportPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <ReturnReport/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ReturnReportPage;