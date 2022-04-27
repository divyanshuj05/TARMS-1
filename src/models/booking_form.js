const mongoose=require('mongoose');

var schema=new mongoose.Schema({
    Room_Name:String,
    userid:String,
    Name:String,
    branch:String,
    year:Number,
    MobileNumber:Number,
    society:String,
    eventNames:String,
    purpose:String,
    eventDate:Date,
    eventTime:String,
    eventTime1:String,
    people:Number,
    AC:String,
    SS:String,
    Status:String
},{
    timestamps:true
})

const Booking_form=mongoose.model('booking_form',schema);
module.exports=Booking_form;