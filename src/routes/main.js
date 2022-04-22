const express=require("express");
const { route } = require("express/lib/application");
const controller=require('../controller/control');
const axios=require("axios");
const async = require("hbs/lib/async");
const { response } = require("express");
const rooms=require("../models/rooms")

const routes=express.Router();

routes.get("/",(req,res)=>{
    res.render("login");
})

routes.get("/signUp",(req,res)=>{
    res.render("signUp");
})

routes.get("/forgotPassword",(req,res)=>{
    res.render("forgotPassword");
})

routes.get("/home",async(req,res)=>{
    rooms.find()
    .then(result=>{
        res.render("home",{Rooms:result})
    })
    .catch(err=>{
        res.send(err);
    })
})

routes.get("/home/changeInfo",(req,res)=>{
    res.render("changeInfo");
})

routes.get("/home/ChangePassword",(req,res)=>{
    res.render("changePassword");
})

routes.get("/home/logout",(req,res)=>{
    res.render("logout");
})

routes.get("/home/contact",(req,res)=>{
    res.render("contact");
})

routes.get("/home/feedback",(req,res)=>{
    res.render("feedback")
})

routes.get("/home/personalDetails",(req,res)=>{
    res.render("personalInfo");
})
routes.get("/home/my_request",(req,res)=>{
    res.render("my_request");
})

routes.get("/home/RequestForm", async(req,res)=>{
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
routes.post("/api/feedback",controller.getFeedback);
routes.post("/api/contact",controller.contact);
routes.put('/api/changePassword',controller.changePassword);
routes.put('/api/changeInfo',controller.changeInfo);
routes.post("/api/book_form",controller.insert2);
routes.get("/api/my_request",controller.request);
module.exports=routes;