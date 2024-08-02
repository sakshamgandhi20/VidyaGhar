const orderHistroyModal = require("../Modal/orderHistroyModal");

function fetchOrderHistroy(req,resp){
    orderHistroyModal.find({buyerEmail:req.query.email})
    .then((result)=>{
        resp.json({status:true, result:result})
    })
    .catch((err)=> resp.json({status:false, err:err.message}))
}

module.exports={
    fetchOrderHistroy
}