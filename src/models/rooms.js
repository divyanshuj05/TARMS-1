const mongoose=require('mongoose')

var schema=mongoose.Schema({
    Room_Number:String,
    Room_Name:String,
    Status:String
})

const rooms=mongoose.model("room",schema);
module.exports=rooms;