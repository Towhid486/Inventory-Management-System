const ParentModel = require("../../models/Returns/ReturnsModel")
const ChildsModel = require("../../models/Returns/ReturnProductModel")
const CreateParentChildsService = require("../../services/common/CreateParentChildService")
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildsService = require("../../services/common/DeleteParentChildsService");

exports.CreateReturns = async (req, res) => {
    let result = await CreateParentChildsService(req,ParentModel,ChildsModel,'ReturnID')
    res.status(200).json(result);
}

exports.ReturnsList = async (req, res) => {
    let SearchRgx = {$regex: req.params.searchKeyword, $options:"i"}
    let JoinStage = {$lookup: {from: "customers", localField:"CustomerID", foreignField:"_id", as: "customers"}}
    let SearchArray = [{Note: SearchRgx},{'customers.Name': SearchRgx},{'customers.Address': SearchRgx},{'customers.Phone': SearchRgx},{'customers.Email': SearchRgx}]

    let Result = await ListOneJoinService(req,ParentModel,SearchArray,JoinStage)
    res.status(200).json(Result)
}

exports.ReturnsDelete = async (req, res) => {
    let Result = await DeleteParentChildsService(req,ParentModel,ChildsModel,'ReturnID')
    res.status(200).json(Result)
}