const mongoose=require('mongoose');

var schema=mongoose.Schema({
    Name:String,
    Rating:String,
    Date:Date
})

const feed=mongoose.model("feedback",schema);
module.exports=feed;