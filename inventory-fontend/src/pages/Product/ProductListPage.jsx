import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
import ProductList from "../../components/Product/ProductList.jsx";

const ProductListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>} >
                    <ProductList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProductListPage;