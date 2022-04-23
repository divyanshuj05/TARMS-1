const express=require("express");
const { route } = require("express/lib/application");
const controller=require('../controller/control');
const axios=require("axios");
const async = require("hbs/lib/async");
const { response } = require("express");
const rooms=require("../models/rooms");
const session=require("express-session");
const read = require("body-parser/lib/read");

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
routes.get("/forgotPassword",(req,res)=>{
    res.render("forgotPassword");
})

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
    rooms.find()
    .then(result=>{
        res.render("home",{Rooms:result})
    })
    .catch(err=>{
        res.send(err);
    })
})

routes.get("/faculty",Auth,async(req,res)=>{
    rooms.find()
    .then(result=>{
        res.render("home",{Rooms:result})
    })
    .catch(err=>{
        res.send(err);
    })
})
routes.get("/home/changeInfo",Auth,(req,res)=>{
    res.render("changeInfo");
})

routes.get("/home/ChangePassword",Auth,(req,res)=>{
    res.render("changePassword");
})

routes.get("/home/logout",Auth,(req,res)=>{
    res.render("logout");
})

routes.get("/home/contact",Auth,(req,res)=>{
    res.render("contact");
})

routes.get("/home/feedback",Auth,(req,res)=>{
    res.render("feedback")
})

routes.get("/home/personalDetails",Auth,(req,res)=>{
    res.render("personalInfo");
})
routes.get("/home/my_request",(req,res)=>{
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
routes.post("/api/faculty_sign",controller.faculty_sign);
routes.get("/api/prsnl_info",controller.prsnlinfo);
routes.post("/api/feedback",controller.getFeedback);
routes.post("/api/contact",controller.contact);
routes.post('/api/changePassword',controller.changePassword);
routes.post('/api/changeInfo',controller.changeInfo);
routes.post("/api/book_form",controller.insert2);
routes.get("/api/my_request",controller.request);

module.exports=routes;