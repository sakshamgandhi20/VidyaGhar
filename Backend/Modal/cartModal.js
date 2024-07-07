const { default: mongoose } = require("mongoose");


    let cartDetails = new mongoose.Schema({
        uId: String,
        userEmail: String,
        bookName: String,
        standard: String,
        edition: String,
        authorName: String,
        status: Boolean,
        price: Number,
        bookPath: String,
        sellerEmail: String
    },
    {
        versionKey:false
    })
    const cartModal = mongoose.model("cartDetails",cartDetails);

module.exports=cartModal;