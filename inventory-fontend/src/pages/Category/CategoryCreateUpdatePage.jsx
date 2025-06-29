import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import CategoryCreateUpdate from "../../components/Category/CategoryCreateUpdate.jsx";

const CategoryCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <CategoryCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CategoryCreateUpdatePage;