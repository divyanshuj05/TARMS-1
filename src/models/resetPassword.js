const mongoose=require("mongoose");

var schema=mongoose.Schema({
    eMail:String,
    Date:Date
})

const reset=mongoose.model("reset",schema);
module.exports=reset;