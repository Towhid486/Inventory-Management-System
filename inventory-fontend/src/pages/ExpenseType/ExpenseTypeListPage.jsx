import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/Master-Layout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import ExpenseTypeList from "../../components/ExpenseType/ExpenseTypeList.jsx";

const ExpenseTypeListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <ExpenseTypeList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ExpenseTypeListPage;