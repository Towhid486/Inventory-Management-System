const PurchasesModel = require('../../models/Purchases/PurchasesModel')

const PurchaseSummaryService = async (Request) => {
    try{
        const UserEmail = Request.headers['email']
        let data = await PurchasesModel.aggregate([
            {$match: {UserEmail:UserEmail}},
            {
                $facet:{
                    Total:[{
                        $group:{
                            _id:0,
                            TotalAmount:{$sum:"$GrandTotal"}
                        }
                    }],
                    Last30Days:[{
                        $group:{
                            _id:{$dateToString: {format: "%Y-%m-%d", date:"$CreatedDate"}},
                            TotalAmount:{$sum:"$GrandTotal"}
                        }
                    },
                        { $sort: {_id:-1} },
                        { $limit: 30 }
                    ]
                }
            }
        ])
        return {status:true, data:data}
    }
    catch (e) {
        return {status:false, data:e.toString()}
    }
}
module.exports=PurchaseSummaryService;