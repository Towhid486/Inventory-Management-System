import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import ExpenseReport from "../../components/Report/ExpenseReport.jsx";

const ExpenseReportPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <ExpenseReport/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ExpenseReportPage;