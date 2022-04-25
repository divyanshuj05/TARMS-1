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

const routes=express.Router();

routes.get("/",(req,res)=>{
    res.render('login');
})

routes.get("/signUp",(req,res)=>{
    res.render("signUp");
})

routes.get("/faculty_sign",(req,res)=>{
    res.render("faculty_signup");
})

routes.get("/facultylogin",(req,res)=>{
    res.render("facultylogin");
})

routes.get("/forgotPassword",(req,res)=>{
    res.render("forgotPassword");
})

let detail=async function(UID)
{
    return await user.findOne({_id:UID})
}

Auth=(req,res,next)=>{
    if(req.session.isAuth){
        next();
    }
    else{
        res.send("Login first");
        //res.render('login')
    }
}

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

routes.get("/faculty",Auth,async(req,res)=>{
    rooms.find({"UserID":user,})
    .then(result=>{
        res.render("faculty",{Rooms:result})
    })
    .catch(err=>{
        res.send(err);
    })
})

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

routes.get("/home/ChangePassword",Auth,(req,res)=>{
    res.render("changePassword");
})

routes.get("/home/logout",Auth,(req,res)=>{
    req.session.destroy((err)=>{
        if(err){res.send(err||"Some error occured")}
        else{res.render("logout");}
    })
})

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
routes.get("/faculty/showdetail",Auth,(req,res)=>{
    const RUid=req.query.rooms;
    let Rooms=detail(RUid);
    Rooms.then(function(data)
    {
        res.render("showdetail",{rooms:data});
    }).catch(err=>{
        console.log(err)
        res.send("Some error occured")
    })

})

routes.get("/home/my_request",Auth,(req,res)=>{
    res.render("my_request");
})

routes.get("/home/RequestForm",Auth,async(req,res)=>{
    const result=req.query
    await rooms.findById(result.id)
    .then(data=>{
        res.render('requestForm',{roomNo:data})
    })
    .catch(err=>{
        res.send(err)
    })    
})

routes.post("/api/signIn",controller.insert);
routes.post("/api/reset",controller.reset);
routes.post("/api/login",controller.login);
routes.post("/api/loginfaculty",controller.loginfaculty);
routes.post("/api/faculty_sign",controller.faculty_sign);
routes.post("/api/feedback",controller.getFeedback);
routes.post("/api/contact",controller.contact);
routes.post('/api/changePassword',controller.changePassword);
routes.post('/api/changeInfo',controller.changeInfo);
routes.post("/api/book_form",controller.insert2);
routes.get("/api/my_request",controller.request);

module.exports=routes;