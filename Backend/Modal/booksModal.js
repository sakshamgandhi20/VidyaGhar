const { default: mongoose } = require("mongoose");

function getBookModal(){
    let bookDetails = new mongoose.Schema({
        uId: String,
        email: String,
        bookName: String,
        standard: String,
        edition: String,
        authorName: String,
        status: Boolean,
        price: Number,
        bookPath: String
    },
    {
        versionKey:false
    })
    const bookModal = mongoose.model("bookDetails",bookDetails);
    return bookModal
}
module.exports={getBookModal}