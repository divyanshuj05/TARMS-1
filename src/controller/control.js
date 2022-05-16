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
const res = require('express/lib/response');
mongoose.connect("mongodb://localhost:27017/test",(err,coll)=>{
    if(err){
        console.error("Database not connected");
        process.exit(1);
    }
    else{console.log("Database connected in controller file")}
});
var db=mongoose.connection;

//insert student into database
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

//insert faculty into database
exports.faculty_sign=(req,res)=>{
    const faculty=new facultydb({
        fac_name:req.body.Name,
        position:req.body.Position,
        uname:req.body.Uid,
        mob:req.body.phone,
        Member_type:req.body.mem_type,
        eMail:req.body.mail,
        password:req.body.pass
    })
    faculty
        .save(faculty)
        .then(data=>{
            console.log("Data inserted"+data),
            res.redirect('/')})
        .catch(err=>{
            res.send(err)});
}

//Forgot Password 
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

//login student
exports.login=async(req,res)=>{
    var user=req.body.User;
    var pass=req.body.Pass;
    var mem1=req.body.member;
    var mem1=req.body.mem1;


    await db.collection('users').findOne({"UserID":user,"Password":pass,"Member_type":mem1},(err,coll)=>{
        if(err)
        {console.log(err)}
        else{
            if(coll==null)
            {
                res.send("Wrong credentials");
            }
            else{
                req.session.isAuth=true;
                userDB.findOne({"UserID":user,"Password":pass,"Member_type":mem1},{projection:{_id:1}})
                .then(data=>{
                    const Uid=data._id;
                    res.redirect(`/home?uid=${data._id}`);
                })
                .catch(err=>{
                    console.log(err)
                    res.send("Some error occured")
                    return;
                })
            }
        }
    });
}

//login faculty
exports.loginfaculty=async (req,res)=>{
    var user=req.body.fUser;
    var pass=req.body.fPass;
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
                facultydb.findOne({"uname":user,"password":pass,"Member_type":mem2},{projection:{_id:1}})
                .then(data=>{
                    res.redirect(`/faculty?uid=${data._id}`);
                })
                .catch(err=>{
                    console.log(err);
                    res.send("Some error occured!!");
                })
            }
        }
    });
}

//get feedback into database
exports.getFeedback=(req,res)=>{
    const obj=new feed({
        Name:req.body.name,
        Rating:req.body.rate,
        Date:new Date()
    })
    let uid=req.body.id;
    console.log(uid)
    obj 
        .save(obj)
        .then(data=>{
            console.log("Data sent "+data)
            res.redirect(`/home?uid=${uid}`)
        })
        .catch(err=>{
            res.send(err || "Some error occured");
        })
}

//get contact response into database
exports.contact=(req,res)=>{
    var obj=new con({
        Name:req.body.name,
        eMail:req.body.mail,
        Message:req.body.message,
        Date:new Date()
    })
    let uid=req.body.id
    obj 
        .save(obj)
        .then(data=>{
            console.log("New message from contact us: "+data)
            res.redirect(`/home?uid=${uid}`)
        })
        .catch(err=>{
            res.send(err || "Some error occured")
        })
}

//change password student
exports.changePassword= async(req,res)=>{
    var oldPass=req.body.oldPassword;
    var newPass=req.body.newPassword;

    let uid=req.body.id;
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
        else{res.redirect(`/home?uid=${uid}`)}
    });
}

//change password faculty
exports.FacultyChangePassword=async(req,res)=>{
    var oldPass=req.body.oldPassword;
    var newPass=req.body.newPassword;
    let uid=req.body.id;
    await db.collection("faculties").updateOne({"password":oldPass},{$set:{"password":newPass}},(err,data)=>{
        if(err)
        {
            console.log(err)
            res.send(err || "Some error occureed during updation. Do the process again")
        }
        else if(data.matchedCount==0)
        {
            res.send("Existing Password does not exist in database")
        }
        else{res.redirect(`/faculty?uid=${uid}`)}
    });
}

//get data of request form
exports.insert2=(req,res)=>{
    const booking_form=new Booking_form({
        Room_Name:req.body.roomName,
        userid:req.body.userID,
        Name:req.body.Name,
        branch:req.body.branch,
        year:req.body.year,
        MobileNumber:req.body.mobile,
        society:req.body.society,
        eventNames:req.body.event,
        purpose:req.body.purpose,
        eventDate:req.body.eventDate,
        eventTime:req.body.eventTime,
        eventTime1:req.body.eventTime1,
        people:req.body.people,
        AC:req.body.AC,
        SS:req.body.SS,
        Status:req.body.status
    })
    let uid=req.body.id;
    let rid=req.body.Rid;
    booking_form
        .save(booking_form)
        .then(async function(data){
            //console.log("Data inserted"+data),
            await rooms.updateOne({"_id":rid},{$set:{"Status":"On Hold"}},function(err,coll)
            {
                if(err){
                    console.log(err)
                    res.send("Some error occured" || err);
                }
                else{
                    res.redirect(`/home?uid=${uid}`)
                }
            }).clone()
        })
        .catch(err=>{
            res.send(err)});
}

//change basic details of student
exports.changeInfo=async (req,res)=>{
    var flag=0;
    var currPhone1=req.body.mobile;
    var currID=req.body.userID;
    var newPhone=req.body.mobile2;
    var newID=req.body.userID2;
    var uid=req.body.id;
    if(currID==newID)
    {
        flag=1;
    }
    const currPhone=Number(currPhone1)
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
                res.redirect(`/home?uid=${uid}`)
            }
        }).clone()
    }
}

//change basic details of faculty
exports.FacultyChangeInfo=async(req,res)=>{
    var flag=0;
    var currPhone1=req.body.mobile;
    var currID=req.body.userID;
    var newPhone=req.body.mobile2;
    var newID=req.body.userID2;
    var uid=req.body.id;
    if(currID==newID)
    {
        flag=1;
    }
    const currPhone=Number(currPhone1)
    const result1=await db.collection("faculties").findOne({"uname":currID,"mob":currPhone});
    const result=await db.collection("faculties").findOne({"uname":newID});
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
        await facultydb.updateOne({"uname":currID,"mob":currPhone},{$set:{"uname":newID,"mob":newPhone}},function(error,data)
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
                res.redirect(`/faculty?uid=${uid}`)
            }
        }).clone()
    }
}

//accepting rejecting room request
exports.RoomResponse=(req,res)=>{
    var result=req.body.Decision;
    var room=req.body.roomName;
    var uid=req.body.uid;
    Booking_form.updateOne({"Room_Name":room,"Status":"Requested"},{$set:{"Status":result}})
    .then(data=>{
    })
    .catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })
    if(result=="Accept")
    {
        rooms.updateOne({"Room_Name":room},{$set:{"Status":"Booked"}})
        .then(data=>{
            res.redirect(`/faculty?uid=${uid}`)
        })
        .catch(err=>{
            console.log(err)
            res.send("Some error occured")
        })
    }
    else{
        rooms.updateOne({"Room_Name":room},{$set:{"Status":"Available"}})
        .then(data=>{
            res.redirect(`/faculty?uid=${uid}`)
        })
        .catch(err=>{
            console.log(err)
            res.send("Some error occured")
        })
    }
}

//delete booking request if user wants
exports.deleteRequest=async(req,res)=>{
    uid=req.body.id;
    let room=req.body.roomName
    await Booking_form.deleteOne({"Room_Name":room,"Status":"Requested"})
    .then(data=>{
    })
    .catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })
    await rooms.updateOne({"Room_Name":room},{$set:{"Status":"Available"}})
    .then(data=>{
        res.redirect(`/home/my_request?uid=${uid}`)
    })
    .catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })
}

setTimeout(() => 
{
    rooms.updateMany({},{$set:{"Status":"Available"}})
    .then(data=>{
        console.log("24 hour reset!!")
    })
    .catch(err=>{
        res.send("Some error occured");
    })
    Booking_form.updateMany({"Status":"Requested"},{$set:{"Status":"Request Timed Out"}})
    .then(data=>{
        console.log("Booking collection also updated after 24 hour reset");
    })
    .catch(err=>{
        res.send("Some error occured" || err);
    })
}, 60000*60*24);