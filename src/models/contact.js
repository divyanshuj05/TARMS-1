const mongoose=require('mongoose');

var schema=mongoose.Schema({
    Name:String,
    eMail:String,
    Message:String,
    Date:Date
})

const con=mongoose.model("contact",schema);
module.exports=con;