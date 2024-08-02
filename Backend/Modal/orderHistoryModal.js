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
    date: Date,
    totalPrice: Number,
  },
  {
    versionKey: false,
  }
);
const orderHistoryModal = mongoose.model(
  "orderHistoryCollection",
  orderDetails
);

module.exports = orderHistoryModal;
