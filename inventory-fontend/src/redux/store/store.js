import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../state-slice/settings-slice.js"
import profileReducer from "../state-slice/profile-slice.js"
import dashboardReducer from "../state-slice/dashboard-slice.js"
import brandReducer from "../state-slice/brand-slice.js"
import supplierReducer from "../state-slice/supplier-slice.js"
import categoryReducer from "../state-slice/category-slice.js"
import customerReducer from "../state-slice/customer-slice.js"
import expenseReducer from "../state-slice/expense-slice.js"
import expensetypeReducer from "../state-slice/expensetype-slice.js"
import purchaseReducer from "../state-slice/purchase-slice.js"
import reportReducer from "../state-slice/report-slice.js"
import productReducer from "../state-slice/product-slice.js"
import returnReducer from "../state-slice/return-slice.js"
import saleReducer from "../state-slice/sale-slice.js"

export default configureStore({
    reducer:{
        settings:settingsReducer,
        dashboard:dashboardReducer,
        profile:profileReducer,
        brand:brandReducer,
        supplier:supplierReducer,
        category:categoryReducer,
        customer:customerReducer,
        expense:expenseReducer,
        expensetype:expensetypeReducer,
        purchase:purchaseReducer,
        report:reportReducer,
        product:productReducer,
        return:returnReducer,
        sale:saleReducer,
    }
})