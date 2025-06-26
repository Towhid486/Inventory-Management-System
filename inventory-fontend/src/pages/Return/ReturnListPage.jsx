import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/Master-Layout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import ReturnList from "../../components/Return/ReturnList.jsx";

const ReturnListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <ReturnList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ReturnListPage;