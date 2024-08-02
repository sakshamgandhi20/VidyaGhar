const { default: mongoose } = require("mongoose");


    let bookDetails = new mongoose.Schema({
        uId: String,
        email: String,
        bookName: String,
        category: String,
        edition: String,
        authorName: String,
        status: Boolean,
        price: Number,
        bookPath: String
    },
    {
        versionKey:false
    })
    const booksModal = mongoose.model("bookDetails",bookDetails);
   
module.exports=booksModal