// const { getCartModal } = require("../Modal/cartModal");
const path = require("path");
const cartModal = require("../Modal/cartModal");
const booksModal = require("../Modal/booksModal");
const orderHistroyModal = require("../Modal/orderHistroyModal");

// function to add product to cart
function doAdd(req, resp) {
  resp.set("json");
  console.log(req.body);
  const update = {
    uId: req.body.uId,
    bookName: req.body.bookName,
    standard: req.body.standard,
    category: req.body.category,
    authorName: req.body.authorName,
    price: req.body.price,
    bookPath: req.body.bookPath,
    status: req.body.status,
    sellerEmail: req.body.sellerEmail,
    userEmail: req.body.email, // in the jwt verification userEmail will be in email
  };

  cartModal
    .updateOne(
      { userEmail: req.body.email, uId: req.body.uId },
      { $set: update },
      { upsert: true }
    )
    .then((result) => {
      if (result.upsertedCount === 1)
        resp.json({ status: true, msg: "producted added to cart" });
      else resp.json({ status: true, msg: "already added to cart" });
    })
    .catch((err) => {
      resp.json({ status: false, err: err.message });
    });
}

// function to show the products in the cart
function doShowCartPrdt(req, resp) {
  console.log(req.body);
  // cartModal.find({userEmail:req.body.userEmail})
  cartModal
    .find({ userEmail: req.body.email })
    .then((result) => {
      console.log(result);
      resp.json({ status: true, result: result });
    })
    .catch(function (err) {
      resp.json({ status: false, err: err.message });
    });
}

// function to remove the product from cart
function doRemovePrdt(req, resp) {
  // console.log(req.body)
  cartModal
    .deleteOne({ userEmail: req.body.email, uId: req.body.uId })
    .then((result) => {
      if (result.deletedCount == 1)
        resp.json({ status: true, msg: "deleted", data: req.body.uId });
      else resp.json({ status: true, msg: "invalid Item" });
    })
    .catch(function () {
      resp.json({ status: false, err: err.message });
    });
}

// function to CheckOut the cart
async function doCheckOutCart(req, resp) {
  try {
    const result = await cartModal.updateMany(
      { userEmail: req.query.email, status: true },
      { $set: { status: false } }
    );

    if (result.modifiedCount !== 0) {
      // find the documents whose status is false
      const purchasedPrdts = await cartModal.find({
        userEmail: req.query.email,
        status: false,
      });
      //
      const uIds = purchasedPrdts.map((product) => product.uId);

      // console.log(uIds);
      const booksStatus = await booksModal.updateMany(
        { uId: { $in: uIds }, status: true },
        { $set: { status: false } }
      );
      console.log(booksStatus);
      resp.json({ status: true, msg: "purchased successfully" });
    } else resp.json({ status: true, msg: "No book in the cart" });
  } catch (err) {
    resp.json({ status: false, err: err.message });
  }
}

async function update(req, resp) {
  try {
    // find all the books of buyer in the cartModal
    const findCartPrdtResult = await cartModal.find(
      {
        userEmail: req.body.userEmail,
      },
      {
        uId: 1,
        bookName: 1,
        category: 1,
        edition: 1,
        authorName: 1,
        price: 1,
        bookPath: 1,
        sellerEmail: 1,
      }
    );
    // resp.json({ result: findCartPrdtResult });
     // extract the uIds of books
    const uIds = findCartPrdtResult.map((product) => product.uId);
    // resp.json({result:uIds})

    // update the status to false in buyer side
    const updateSellerSide = await booksModal.updateMany(
      { uId: { $in: uIds } },
      { $set: { status: false } }
    );

    // checks all books status is updated or not
    if (updateSellerSide.modifiedCount !== uIds.length) {
      // if the status of all book is not updated it will reverse the status
      const reverseUpdateSellerSide = await booksModal.updateMany(
        { uId: { $in: uIds } },
        { $set: { status: true } }
      );
      console.log(
        reverseUpdateSellerSide.matchedCount +
          " " +
          reverseUpdateSellerSide.modifiedCount
      );
      resp.json({ status: true, msg: "item not found" });
    }
    else {
      // resp.json({ result: updateSellerSide });
      const doc =  new orderHistroyModal({
        buyerEmail:req.body.userEmail,
        data: findCartPrdtResult,
        date: Date.now()
      })
    const orderHistroyResult = await doc.save()
      resp.json(orderHistroyResult)
      // const orderHistroyResult = await orderHistroyModal.
    }
  } catch (err) {
    resp.json({ status: false, err: err.message });
  }
}

module.exports = {
  doAdd,
  doShowCartPrdt,
  doRemovePrdt,
  doCheckOutCart,
  update,
};
