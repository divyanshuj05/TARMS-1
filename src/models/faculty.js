const mongoose=require('mongoose');

var schema=new mongoose.Schema({

    fac_name: String, 
    position: String,  
    uname:{
        type:String,
        unique:true
    },
    mob: Number,
    Member_type:String,

    eMail:{
        type:String,
        unique:true
    },
    password: {
        type:String,
        unique:true
    }
})

const facultydb=mongoose.model('faculty',schema);
module.exports=facultydb;