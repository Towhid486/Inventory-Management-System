import React, {Fragment, lazy, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/masterLayout/LazyLoader.jsx";
const Profile = lazy(() => import("../../components/Users/Profile.jsx"))

const ProfilePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <Profile/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProfilePage;