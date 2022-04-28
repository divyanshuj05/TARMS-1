const express=require("express");
const { route } = require("express/lib/application");
const controller=require('../controller/control');
const axios=require("axios");
const async = require("hbs/lib/async");
const { response } = require("express");
const rooms=require("../models/rooms");
const session=require("express-session");
const read = require("body-parser/lib/read");
const user=require('../models/user');
const res = require("express/lib/response");
const { aggregate } = require("../models/user");
const Booking_form = require("../models/booking_form");
const facultydb=require("../models/faculty");
const { default: mongoose } = require("mongoose");
const routes=express.Router();

//some functions
let detail=async function(UID)
{
    return await user.findOne({_id:UID})
}
let detail2=async function(UID)
{
    return await facultydb.findOne({_id:UID})
}
Auth=(req,res,next)=>{
    if(req.session.isAuth){
        next();
    }
    else{
        res.send("Login first @ http://localhost:3000/");
        //res.render('login')
    }
}

//login student
routes.get("/",(req,res)=>{
    res.render('login');
})

//login faculty
routes.get("/facultylogin",(req,res)=>{
    res.render("facultylogin");
})

//sign up student
routes.get("/signUp",(req,res)=>{
    res.render("signUp");
})

//sign up faculty
routes.get("/faculty_sign",(req,res)=>{
    res.render("faculty_signup");
})

//forgot password student
routes.get("/forgotPassword",(req,res)=>{
    res.render("forgotPassword");
})

//home student
routes.get("/home",Auth,async(req,res)=>{
    var userName='hello';
    async function getName()
    {
        let User=detail(req.query.uid);
        User.then(data=>
        {
            userName=data.Name;
        }).catch(err=>{
            console.log(err)
            res.send("Some error occured")
        })
    }
    await getName()
    rooms.find()
    .then(result=>{
        res.render("home",{Rooms:result,uid:req.query.uid,name:userName})
    })
    .catch(err=>{
        console.log(err)
        res.send(err);
    })
})

//home faculty
routes.get("/faculty",Auth,async(req,res)=>{
    var userName='hello';
    async function getName(){
        let user=detail2(req.query.uid);
        user.then(data=>{
            userName=data.fac_name;
        }).catch(err=>{
            console.log(err)
            res.send("Some error occured");
        })
    }
    await getName()
    rooms.find({"Status":"On Hold"})
    .then(result=>{
        res.render("faculty",{Rooms:result,uid:req.query.uid,name:userName})
    })
    .catch(err=>{
        res.send(err);
    })
})

//change information student
routes.get("/home/changeInfo",Auth,(req,res)=>{
    var id=req.query.uid;
    let User=detail(id);
    User.then(function(data)
    {
        res.render("changeInfo",{uid:data});
    }).catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })
})

//change information faculty
routes.get("/faculty/changeInfo",Auth,(req,res)=>{
    var id=req.query.uid;
    let User=detail2(id);
    User.then(function(data)
    {
        res.render("facultyChangeInfo",{uid:data});
    }).catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })
})

//change password student
routes.get("/home/ChangePassword",Auth,(req,res)=>{
    var id=req.query.uid;
    let User=detail(id);
    User.then(function(data)
    {
        res.render("changePassword",{uid:data});
    }).catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })
})

//change password faculty
routes.get("/faculty/ChangePassword",Auth,(req,res)=>{
    var id=req.query.uid;
    let User=detail2(id);
    User.then(function(data)
    {
        res.render("facultyChangePassword",{uid:data});
    }).catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })
})

//logout
routes.get("/home/logout",Auth,(req,res)=>{
    req.session.destroy((err)=>{
        if(err){res.send(err||"Some error occured")}
        else{res.render("logout");}
    })
})

//contact student
routes.get("/home/contact",Auth,(req,res)=>{
    var id=req.query.uid;
    let User=detail(id);
    User.then(function(data)
    {
        res.render("contact",{uid:data});
    }).catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })
})

//feedback student
routes.get("/home/feedback",Auth,(req,res)=>{
    var id=req.query.uid;
    let User=detail(id);
    User.then(function(data)
    {
        res.render("feedback",{uid:data});
    }).catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })
})

//personal information student 
routes.get("/home/personalDetails",Auth,(req,res)=>{
    const Uid=req.query.uid;
    let User=detail(Uid);
    User.then(function(data)
    {
        res.render("personalInfo",{uid:data});
    }).catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })
})

//personal information faculty
routes.get("/faculty/personalDetails",Auth,(req,res)=>{
    const Uid=req.query.uid;
    let User=detail2(Uid);
    User.then(function(data)
    {
        res.render("facultyPersonalDetails",{uid:data});
    }).catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })
})

//show room details faculty
routes.get("/faculty/showdetail",Auth,async(req,res)=>{
    var detail="hello"
    await Booking_form.findOne({"Room_Name":req.query.id,"Status":"Requested"})
    .then(data=>{
        detail=data
    })
    .catch(err=>{
        console.log(err)
    })
    var userName='hello';
    async function getName(){
        let user=detail2(req.query.uid);
        user.then(data=>{
            userName=data.fac_name;
        }).catch(err=>{
            console.log(err)
            res.send("Some error occured");
        })
    }
    await getName()
    await rooms.findOne({"Room_Name":req.query.id})
    .then(function(data)
    {
        res.render("showdetail",{rooms:data,BookingDetail:detail,uid:req.query.uid,name:userName});
    }).catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })

})

//my request student
routes.get("/home/my_request",Auth,async(req,res)=>{
    var name='hello';
    var form='myform';
    let userName=detail(req.query.uid)
    await userName.then(data=>{
        name=data.Name
    })
    .catch(err=>{
        console.log(err)
        res.send("Some error occured");
    })
    await Booking_form.find({"Name":name})
    .then(data=>{
        form=data
    })
    .catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })
    await user.findById(req.query.uid)
    .then(data=>
    {
        res.render("my_request",{user:data,uid:req.query.uid,form:form});
    }).catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })
})

//request form student
routes.get("/home/RequestForm",Auth,async(req,res)=>{
    const result=req.query
    var userData='hello';
    async function getName()
    {
        let User=detail(result.uid);
        User.then(data=>
        {
            userData=data;
        }).catch(err=>{
            console.log(err)
            res.send("Some error occured")
        })
    }
    await getName()
    await rooms.findById(result.id)
    .then(data=>{
        res.render('requestForm',{roomNo:data,user:userData})
    })
    .catch(err=>{
        res.send(err)
    })    
})

routes.post("/api/response",controller.RoomResponse);
routes.post("/api/signIn",controller.insert);
routes.post("/api/reset",controller.reset);
routes.post("/api/login",controller.login);
routes.post("/api/loginfaculty",controller.loginfaculty);
routes.post("/api/faculty_sign",controller.faculty_sign);
routes.post("/api/feedback",controller.getFeedback);
routes.post("/api/contact",controller.contact);
routes.post('/api/changePassword',controller.changePassword);
routes.post("/api/FacultyChangePassword",controller.FacultyChangePassword)
routes.post('/api/changeInfo',controller.changeInfo);
routes.post("/api/FacultyChangeInfo",controller.FacultyChangeInfo)
routes.post("/api/book_form",controller.insert2);

module.exports=routes;