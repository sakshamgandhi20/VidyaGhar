const {default: mongoose} = require("mongoose")

let categoryDetails = new mongoose.Schema({
    category: Array
},
{
    versionKey: false
}
)
const categoryModal = mongoose.model("category",categoryDetails);

module.exports = categoryModal