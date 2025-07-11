const DataModel = require('../../models/Suppliers/SuppliersModel')
const CreateService = require('../../services/common/CreateService')
const UpdateService = require('../../services/common/UpdateService')
const ListService = require('../../services/common/ListService')
const DropDownService = require('../../services/common/DropDownService')
const mongoose = require("mongoose");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const PurchasesModel = require("../../models/Purchases/PurchasesModel");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");


exports.CreateSuppliers = async (req, res) => {
    let Result = await CreateService(req,DataModel)
    res.status(200).json(Result)
}

exports.UpdateSuppliers = async (req, res) => {
    let Result = await UpdateService(req,DataModel)
    res.status(200).json(Result)
}

exports.SuppliersList = async (req, res) => {
    let SearchRgx = {$regex: req.params.searchKeyword, $options:"i"}
    let SearchArray = [{SupplierName: SearchRgx},{Phone: SearchRgx},{Email: SearchRgx},{Address: SearchRgx}]
    let Result = await ListService(req,DataModel,SearchArray)
    res.status(200).json(Result)
}

exports.SuppliersDetailsByID = async (req, res) => {
    let Result = await DetailsByIDService(req,DataModel)
    res.status(200).json(Result)
}

exports.SuppliersDropDown = async (req, res) => {
    let Result = await DropDownService(req,DataModel,{_id:1,SupplierName:1})
    res.status(200).json(Result)
}


exports.DeleteSupplier = async (req, res) => {
    let DeleteID = req.params.id;
    const ObjectID = mongoose.Types.ObjectId;
    let Id = new ObjectID(DeleteID)
    let CheckAssociate = await CheckAssociateService({SupplierID:Id},PurchasesModel)
    if(CheckAssociate){
        res.status(200).json({status:"Associate", data: "Associate with Purchase!"})
    }
    else{
        let Result = await DeleteService(req,DataModel)
        res.status(200).json(Result)
    }
}