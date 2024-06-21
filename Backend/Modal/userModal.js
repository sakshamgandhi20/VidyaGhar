const {default: mongoose} = require('mongoose')

function getUserModal(){
    let user = new mongoose.Schema({
        email:{type:String,unique:true,index:true,required:true},
        password:String
    },
    {
        versionKey:false
    }
)
const userModal = mongoose.model("userCollection",user);
return userModal
}
module.exports={getUserModal}
