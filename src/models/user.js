const mongoose=require('mongoose');

var schema=new mongoose.Schema({
    Name:String,
    UserID:{
        type:String,
        unique:true
    },
    eMail:{
        type:String,
        unique:true
    },
    MobileNumber:Number,
    DOB:Date,
    Password:String
})

const userDB=mongoose.model('user',schema);
module.exports=userDB;