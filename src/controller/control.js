const userDB=require('../models/user');
const facultydb=require('../models/faculty');
const Booking_form=require('../models/booking_form');
const reset=require("../models/resetPassword");
const feed=require("../models/feedback");
const con=require('../models/contact');
const rooms=require('../models/rooms');
const { response } = require('express');
const mongoose=require("mongoose");
const async = require('hbs/lib/async');
const session=require('express-session');
mongoose.connect("mongodb://localhost:27017/test",(err,coll)=>{
    if(err){
        console.error("Database not connected");
        process.exit(1);
    }
    else{console.log("Database connected in controller file")}
});
var db=mongoose.connection;

exports.insert=(req,res)=>{
    const user=new userDB({
        Name:req.body.Name,
        UserID:req.body.Uid,
        eMail:req.body.mail,
        MobileNumber:req.body.phone,
        Member_type:req.body.mem_type,
        DOB:req.body.dob,
        Password:req.body.pass
    })
    user
        .save(user)
        .then(data=>{
            console.log("Data inserted"+data),
            res.redirect('/')})
        .catch(err=>{
            res.send(err)});
}

exports.faculty_sign=(req,res)=>{
    const faculty=new facultydb({
        fac_name:req.body.Name,
        position:req.body.Position,
        uname:req.body.Uid,
        mob:req.body.phone,
        Member_type:req.body.mem_type,
        eMail:req.body.mail,
        Password:req.body.pass
    })
    faculty
        .save(faculty)
        .then(data=>{
            console.log("Data inserted"+data),
            res.redirect('/faculty')})
        .catch(err=>{
            res.send(err)});
}
exports.reset=(req,res)=>{
    const mail=new reset({
        eMail:req.body.Pass,
        Date:new Date()
    })
    mail    
        .save(mail)
        .then(data=>{
            console.log("Reset mail inserted "+data),
            res.redirect("/")})
        .catch(err=>{
            res.send(err);
        })
}

exports.login=async (req,res)=>{
    var user=req.body.User;
    var pass=req.body.Pass;
    var mem1=req.body.mem1;
    

    await db.collection('users').findOne({"UserID":user,"Password":pass,"Member_type":mem1},(err,coll)=>{
        console.log("HEllo:"+mem1)
        if(err)
        {console.log(err)}
        else{
            if(coll==null)
            {
                res.send("Wrong credentials");
            }
            else{
                req.session.isAuth=true;
                res.redirect("/home");
            }
        }
    });
}


exports.loginfaculty=async (req,res)=>{
    var user=req.body.User;
    var pass=req.body.Pass;
    var mem2=req.body.mem2;

    await db.collection('faculties').findOne({"uname":user,"password":pass,"Member_type":mem2},(err,coll)=>{
        if(err)
        {console.log(err)}
        else{
            if(coll==null)
            {
                res.send("Wrong credentials");
            }
            else{
                req.session.isAuth=true;
                res.redirect("/faculty");
            }
        }
    });
}

exports.getFeedback=(req,res)=>{
    const obj=new feed({
        Name:req.body.name,
        Rating:req.body.rate,
        Date:new Date()
    })

    obj 
        .save(obj)
        .then(data=>{
            console.log("Data sent "+data)
            res.redirect('/home')
        })
        .catch(err=>{
            res.send(err || "Some error occured");
        })
}

exports.contact=(req,res)=>{
    var obj=new con({
        Name:req.body.name,
        eMail:req.body.mail,
        Message:req.body.message,
        Date:new Date()
    })

    obj 
        .save(obj)
        .then(data=>{
            console.log("New message from contact us: "+data)
            res.redirect('/home')
        })
        .catch(err=>{
            res.send(err || "Some error occured")
        })
}
exports.prsnlinfo= (req,res)=>
{
    if(req.query.id)
    {
        const id = req.query.id;
        userDB.findById(id)
            .then(user=>
            {
                if(!user)
                {
                    res.status(404).send({message:"Not found user with id"+id})
                }
                else
                {
                    res.send(user)
                }
            })
    .catch(err =>{
        res.status(500).send({message:err.message||"Error occurred while retrieving user information"})
    })
}   } 

exports.changePassword= async(req,res)=>{
    var oldPass=req.body.oldPassword;
    var newPass=req.body.newPassword;

    await db.collection("users").updateOne({"Password":oldPass},{$set:{"Password":newPass}},(err,data)=>{
        if(err)
        {
            console.log(err)
            res.send(err || "Some error occureed during updation. Do the process again")
        }
        else if(data.matchedCount==0)
        {
            res.send("Existing Password does not exist in database")
        }
        else{res.redirect('/home')}
    });
}
exports.insert2=(req,res)=>{
    const booking_form=new Booking_form({
        Name:req.body.Name,
        branch:req.body.branch,
        year:req.body.year,
        MobileNumber:req.body.mobile,
        eventNames:req.body.event,
        purpose:req.body.purpose,
        eventDate:req.body.eventDate,
        eventTime:req.body.eventTime,
        eventTime1:req.body.eventTime1,
        people:req.body.people,
        AC:req.body.AC,
        SS:req.body.SS
    })
    booking_form
        .save(booking_form)
        .then(data=>{
            console.log("Data inserted"+data),
            res.redirect('/home')})
        .catch(err=>{
            res.send(err)});
}
exports.request=(req,res)=>{
    Booking_form.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({message:err.message||"Error occurred while retrieving user information"})
    })
}    
exports.changeInfo=async (req,res)=>{
    var flag=0;
    var currPhone=req.body.mobile;
    var currID=req.body.userID;
    var newPhone=req.body.mobile2;
    var newID=req.body.userID2;
    if(currID==newID)
    {
        flag=1;
    }
    const result1=await db.collection("users").findOne({"UserID":currID,"MobileNumber":currPhone});
    const result=await db.collection("users").findOne({"UserID":newID});
    if(result1==null)
    {
        res.send("Existing data does not exist in the database!!");
        return;
    }
    else if(result!=null && flag==0)
    {
        res.send("User ID already taken")
        return;
    }
    else
    {
        await userDB.updateOne({"UserID":currID,"MobileNumber":currPhone},{$set:{"UserID":newID,"MobileNumber":newPhone}},function(error,data)
        {
            if(error)
            {
                console.log(error);
                res.send(err||"Some error occured");
                return;
            }
            else
            {
                console.log("Data updated")
                res.redirect("/home")
            }
        }).clone()
    }
}