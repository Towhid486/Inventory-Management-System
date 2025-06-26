import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/Master-Layout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import ExpenseList from "../../components/Expense/ExpenseList.jsx";

const ExpenseListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <ExpenseList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ExpenseListPage;