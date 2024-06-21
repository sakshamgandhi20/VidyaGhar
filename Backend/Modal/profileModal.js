const { default: mongoose } = require("mongoose");

function getProfileModal(){
    let profile = new mongoose.Schema({
        email:String,
        name:String,
        address:String,
        mobile:Number,
        city:String,
        
    },
    {
        versionKey:false
    })
    const profileModal = mongoose.model("profile",profile);
    return profileModal
}
module.exports={getProfileModal}