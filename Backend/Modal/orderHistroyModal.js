const { default: mongoose } = require("mongoose");

let orderDetails = new mongoose.Schema(
  {
    buyerEmail: String,
    data: [
      {
        uId: String,
        bookName: String,
        category: String,
        edition: String,
        authorName: String,
        price: Number,
        bookPath: String,
        sellerEmail: String,
      },
    ],
    date: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);
const orderHistroyModal = mongoose.model(
  "orderHistroyCollection",
  orderDetails
);

module.exports = orderHistroyModal;
