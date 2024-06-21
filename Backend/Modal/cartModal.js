const { default: mongoose } = require("mongoose");

function getCartModal(){
    let cartDetails = new mongoose.Schema({
        email: String,
        bookName: String,
        standard: String,
        edition: String,
        authorName: String,
        status: Boolean,
        price: String,
        bookPath: String,
        userEmail: String
    },
    {
        versionKey:false
    })
    const cartModal = mongoose.model("cartDetails",cartDetails);
    return cartModal
}
module.exports={getCartModal}