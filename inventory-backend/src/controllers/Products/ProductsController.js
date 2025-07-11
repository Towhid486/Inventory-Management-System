const mongoose = require("mongoose");
const DataModel = require('../../models/Products/ProductsModel')
const CreateService = require('../../services/common/CreateService')
const UpdateService = require('../../services/common/UpdateService')
const ListTwoJoinService = require("../../services/common/ListTwoJoinService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const ReturnProductsModel = require("../../models/Returns/ReturnProductModel");
const PurchaseProductsModel = require("../../models/Purchases/PurchaseProductModel");
const SaleProductsModel = require("../../models/Sales/SaleProductModel");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const DropDownService = require("../../services/common/DropDownService");



exports.CreateProducts = async (req, res) => {
    let Result = await CreateService(req,DataModel)
    res.status(200).json(Result)
}

exports.UpdateProducts = async (req, res) => {
    let Result = await UpdateService(req,DataModel)
    res.status(200).json(Result)
}

exports.ProductsList = async (req, res) => {
    let SearchRgx = {$regex: req.params.searchKeyword, $options:"i"}

    let JoinStage1 = {$lookup: {from: "brands", localField:"BrandID", foreignField:"_id", as: "brands"}}
    let JoinStage2 = {$lookup: {from: "categories", localField:"CategoryID", foreignField:"_id", as: "categories"}}

    let SearchArray = [{Name: SearchRgx},{Unit: SearchRgx},{Details: SearchRgx},{'brands.Name': SearchRgx},{'categories.Name': SearchRgx}]

    let Result = await ListTwoJoinService(req,DataModel,SearchArray,JoinStage1,JoinStage2)
    res.status(200).json(Result)
}

exports.ProductsDetailsByID = async (req, res) => {
    let Result = await DetailsByIDService(req,DataModel)
    res.status(200).json(Result)
}


exports.DeleteProducts = async (req, res) => {
    let DeleteID = req.params.id;
    const ObjectID = mongoose.Types.ObjectId;
    let Id = new ObjectID(DeleteID)
    let CheckReturnAssociate = await CheckAssociateService({ProductID:Id},ReturnProductsModel)
    let CheckPurchaseAssociate = await CheckAssociateService({ProductID:Id},PurchaseProductsModel)
    let CheckSaleAssociate = await CheckAssociateService({ProductID:Id},SaleProductsModel)

    if(CheckReturnAssociate){
        res.status(200).json({status:"Associate", data: "Associate with Return!"})
    }else if(CheckPurchaseAssociate){
        res.status(200).json({status:"Associate", data: "Associate with Purchase!"})
    }else if(CheckSaleAssociate){
        res.status(200).json({status:"Associate", data: "Associate with Sale!"})
    }
    else{
        let Result = await DeleteService(req,DataModel)
        res.status(200).json(Result)
    }
}

exports.ProductsDropDown=async (req, res) => {
    let Result= await DropDownService(req,DataModel,{_id:1,Name:1})
    res.status(200).json(Result)
}