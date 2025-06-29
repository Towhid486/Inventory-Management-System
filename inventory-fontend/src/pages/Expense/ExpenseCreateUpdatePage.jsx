import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/Master-Layout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import ExpenseCreateUpdate from "../../components/Expense/ExpenseCreateUpdate.jsx";

const ExpenseCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <ExpenseCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ExpenseCreateUpdatePage;