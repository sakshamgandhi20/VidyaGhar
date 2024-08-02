const orderHistoryModal = require("../Modal/orderHistoryModal");

function fetchOrderHistory(req,resp){
    console.log(req.query.email)
    orderHistoryModal.find({buyerEmail:req.query.email}).sort({date: -1})
    .then((result)=>{
        resp.json({status:true, result:result})
    })
    .catch((err)=> resp.json({status:false, err:err.message}))
}

module.exports={
    fetchOrderHistory
}