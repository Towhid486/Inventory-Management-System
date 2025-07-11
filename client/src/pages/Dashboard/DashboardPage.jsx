import React, {Fragment, lazy, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from './../../components/MasterLayout/LazyLoader';
import {getToken} from "../../helper/SessionHelper.js";
import {useNavigate} from "react-router-dom";

const Dashboard = lazy(() => import("../../components/Dashboard/Dashboard.jsx"))

const DashboardPage = () => {
    let navigate = useNavigate()
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    {
                        getToken()
                            ? <Dashboard/>
                            : navigate('/Login')
                    }
                
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DashboardPage;