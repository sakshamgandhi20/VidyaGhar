// const { getCartModal } = require("../Modal/cartModal");
const path = require("path");
const cartModal = require('../Modal/cartModal')

// function to add product to cart
function doAdd(req, resp) {
  resp.set("json");
  console.log(req.body);
const update = {
  uId: req.body.uId,
  bookName: req.body.bookName,
  standard: req.body.standard,
  edition: req.body.edition,
  authorName: req.body.authorName,
  price: req.body.price,
  bookPath: req.body.bookPath,
  status: req.body.status,
  sellerEmail: req.body.sellerEmail,
  userEmail: req.body.email,}
  // const doc = new cartModal(req.body);
  // doc
  //   .save()
  //   .then((retdoc) => {
  //     resp.json({ status: true, rec: retdoc });
  //   })
  //   .catch((err) => {
  //     resp.json({ status: false, err: err.message });
  //   });
  cartModal.updateOne({userEmail:req.body.email, uId:req.body.uId}, 
    {$set: update},
    {upsert: true}
  )
  .then((result) =>{
    if(result.upsertedCount === 1) resp.json({status: true, msg:"producted added to cart"})
      else resp.json({status: true, msg: "already added to cart"})
  })
  .catch((err) => {
    resp.json({ status: false, err: err.message });
  });}

// function to show the products in the cart
function doShowCartPrdt(req, resp) {
  console.log(req.body);
  // cartModal.find({userEmail:req.body.userEmail})
  cartModal
    .find({ userEmail: req.body.email })
    .then((result) => {
      // console.log(result);
      resp.json({ status: true, result: result });
    })
    .catch(function () {
      resp.json({ status: false, err: err.message });
    });
}

// function to remove the product from cart
function doRemovePrdt(req,resp) {
  // console.log(req.body)
  cartModal.deleteOne({userEmail: req.body.email,uId:req.body.uId})
  .then((result) =>{
    if(result.deletedCount == 1) 
    resp.json({ status: true, msg:"deleted", data:req.body.uId})
    else resp.json({ status: true, msg:"invalid Item"})
  })
  .catch(function () {
    resp.json({ status:false, err: err.message})
  })
}



module.exports = { doAdd, doShowCartPrdt, doRemovePrdt};
