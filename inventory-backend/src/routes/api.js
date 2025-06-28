const express = require('express');

const AuthVerification = require('../middlewares/AuthVerification')

const UsersController = require('../controllers/Users/UsersController')
const BrandsController = require('../controllers/Brands/BrandsController')
const CategoriesController = require('../controllers/Categories/CategoriesController')
const CustomersController = require('../controllers/Customers/CustomersController')
const SuppliersController = require('../controllers/Suppliers/SuppliersController')
const ExpenseTypesController = require('../controllers/Expenses/ExpenseTypesController')
const ExpensesController = require('../controllers/Expenses/ExpensesController')
const ProductsController = require('../controllers/Products/ProductsController')
const PurchasesController = require('../controllers/Purchases/PurchasesController')
const ReturnsController = require('../controllers/Returns/ReturnsController')
const SalesController = require('../controllers/Sales/SalesController')
const ReportsController = require('../controllers/Reports/ReportsController')
const SummaryController = require('../controllers/Summary/SummaryController')

const router = express.Router()


// User Profile
router.post('/Registration',UsersController.Registration)
router.post('/Login',UsersController.Login)
router.post('/ProfileUpdate',AuthVerification,UsersController.ProfileUpdate)
router.get('/ProfileDetails',AuthVerification,UsersController.ProfileDetails)
router.get('/RecoverVerifyEmail/:email',UsersController.RecoverVerifyEmail)
router.get('/RecoverVerifyOTP/:email/:otp',UsersController.RecoverVerifyOTP)
router.post('/RecoverResetPass',UsersController.RecoverResetPass)


// Brands
router.post('/CreateBrand',AuthVerification,BrandsController.CreateBrand)
router.post('/UpdateBrand/:id',AuthVerification,BrandsController.UpdateBrand)
router.get('/BrandList/:pageNo/:perPage/:searchKeyword',AuthVerification,BrandsController.BrandList)
router.get('/BrandDropDown',AuthVerification,BrandsController.BrandDropDown)
router.get('/DeleteBrand/:id',AuthVerification,BrandsController.DeleteBrand)
router.get('/BrandDetailsByID/:id',AuthVerification,BrandsController.BrandDetailsByID)

// Caterories
router.post('/CreateCategories',AuthVerification,CategoriesController.CreateCategories)
router.post('/UpdateCategories/:id',AuthVerification,CategoriesController.UpdateCategories)
router.get('/CategoriesList/:pageNo/:perPage/:searchKeyword',AuthVerification,CategoriesController.CategoriesList)
router.get('/CategoriesDropDown',AuthVerification,CategoriesController.CategoriesDropDown)
router.get('/DeleteCategories/:id',AuthVerification,CategoriesController.DeleteCategories)
router.get('/CategoriesDetailsByID/:id',AuthVerification,CategoriesController.CategoriesDetailsByID)

// Customers
router.post('/CreateCustomers',AuthVerification,CustomersController.CreateCustomers)
router.post('/UpdateCustomers/:id',AuthVerification,CustomersController.UpdateCustomers)
router.get('/CustomersList/:pageNo/:perPage/:searchKeyword',AuthVerification,CustomersController.CustomersList)
router.get('/CustomersDropDown',AuthVerification,CustomersController.CustomersDropDown)
router.get('/DeleteCustomers/:id',AuthVerification,CustomersController.DeleteCustomers)
router.get('/CustomerDetailsByID/:id',AuthVerification,CustomersController.CustomerDetailsByID)

// Suppliers
router.post('/CreateSuppliers',AuthVerification,SuppliersController.CreateSuppliers)
router.post('/UpdateSuppliers/:id',AuthVerification,SuppliersController.UpdateSuppliers)
router.get('/SuppliersList/:pageNo/:perPage/:searchKeyword',AuthVerification,SuppliersController.SuppliersList)
router.get('/SuppliersDropDown',AuthVerification,SuppliersController.SuppliersDropDown)
router.get('/DeleteSupplier/:id',AuthVerification,SuppliersController.DeleteSupplier)
router.get('/SuppliersDetailsByID/:id',AuthVerification,SuppliersController.SuppliersDetailsByID)

// ExpenseTypes
router.post('/CreateExpenseTypes',AuthVerification,ExpenseTypesController.CreateExpenseTypes)
router.post('/UpdateExpenseTypes/:id',AuthVerification,ExpenseTypesController.UpdateExpenseTypes)
router.get('/ExpenseTypesList/:pageNo/:perPage/:searchKeyword',AuthVerification,ExpenseTypesController.ExpenseTypesList)
router.get('/ExpenseTypesDropDown',AuthVerification,ExpenseTypesController.ExpenseTypesDropDown)
router.get('/ExpenseTypesDetailsByID/:id',AuthVerification,ExpenseTypesController.ExpenseTypesDetailsByID)
router.get('/DeleteExpenseType/:id',AuthVerification,ExpenseTypesController.DeleteExpenseType)



// Expenses
router.post('/CreateExpenses',AuthVerification,ExpensesController.CreateExpenses)
router.post('/UpdateExpenses/:id',AuthVerification,ExpensesController.UpdateExpenses)
router.get('/ExpensesList/:pageNo/:perPage/:searchKeyword',AuthVerification,ExpensesController.ExpensesList)
router.get('/DeleteExpense/:id',AuthVerification,ExpensesController.DeleteExpense)
router.get('/ExpenseDetailsByID/:id',AuthVerification,ExpensesController.ExpenseDetailsByID)

// Products
router.post('/CreateProducts',AuthVerification,ProductsController.CreateProducts)
router.post('/UpdateProducts/:id',AuthVerification,ProductsController.UpdateProducts)
router.get('/ProductsList/:pageNo/:perPage/:searchKeyword',AuthVerification,ProductsController.ProductsList)
router.get('/DeleteProducts/:id',AuthVerification,ProductsController.DeleteProducts)
router.get('/ProductsDetailsByID/:id',AuthVerification,ProductsController.ProductsDetailsByID)



// Purchases
router.post('/CreatePurchases',AuthVerification,PurchasesController.CreatePurchases)
router.get('/PurchasesList/:pageNo/:perPage/:searchKeyword',AuthVerification,PurchasesController.PurchasesList)
router.get('/PurchaseDelete/:id',AuthVerification,PurchasesController.PurchaseDelete)

// Returns
router.post('/CreateReturns',AuthVerification,ReturnsController.CreateReturns)
router.get('/ReturnsList/:pageNo/:perPage/:searchKeyword',AuthVerification,ReturnsController.ReturnsList)
router.get('/ReturnsDelete/:id',AuthVerification,ReturnsController.ReturnsDelete)

// Sales
router.post('/CreateSales',AuthVerification,SalesController.CreateSales)
router.get('/SalesList/:pageNo/:perPage/:searchKeyword',AuthVerification,SalesController.SalesList)
router.get('/SalesDelete/:id',AuthVerification,SalesController.SalesDelete)

// Reports
router.post('/ExpensesByDate',AuthVerification,ReportsController.ExpensesByDate)
router.post('/PurchasesByDate',AuthVerification,ReportsController.PurchasesByDate)
router.post('/ReturnByDate',AuthVerification,ReportsController.ReturnByDate)
router.post('/SalesByDate',AuthVerification,ReportsController.SalesByDate)

// Summary
router.get('/ExpensesSummary',AuthVerification,SummaryController.ExpensesSummary)
router.get('/PurchaseSummary',AuthVerification,SummaryController.PurchaseSummary)
router.get('/ReturnSummary',AuthVerification,SummaryController.ReturnSummary)
router.get('/SalesSummary',AuthVerification,SummaryController.SalesSummary)


module.exports = router;