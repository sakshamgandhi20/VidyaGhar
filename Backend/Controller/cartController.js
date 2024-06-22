const { getCartModal } = require("../Modal/cartModal");
const path = require("path");
const cartModal = getCartModal();

function doAdd(req, resp) {
  resp.set("json");
  console.log(req.body);

  const doc = new cartModal(req.body);
  doc
    .save()
    .then((retdoc) => {
      resp.json({ status: true, rec: retdoc });
    })
    .catch((err) => {
      resp.json({ status: false, err: err.message });
    });
}

function doShowCartPrdt(req, resp) {
  console.log(req.body);
  // cartModal.find({userEmail:req.body.userEmail})
  cartModal
    .find({ userEmail: req.body.userEmail })
    .then((result) => {
      console.log(result);
      resp.json({ status: true, result: result });
    })
    .catch(function () {
      resp.json({ status: false, err: err.message });
    });
}

module.exports = { doAdd, doShowCartPrdt };
