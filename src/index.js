const express=require("express");
const bodyParser=require("body-parser");
const hbs=require("hbs");
const mongoose=require("mongoose");
const session=require("express-session");
const MongoDBStore=require('connect-mongodb-session')(session)
const app=express();

//parse requests using body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//creating storage location for session data
const store=new MongoDBStore({
    uri:'mongodb://localhost:27017/test',
    collection:'SessionData'
});

//creating session
app.use(session(
    {
        secret:"c'est un secret",
        cookie:{
            maxAge:1000*60*15
        },
        resave:false,
        saveUninitialized:false,
        store:store
    }
))

//load routes
const routes=require("./routes/main");
const { collection } = require("./models/user");
app.use("",routes);

//set static files path
app.use(express.static('public'));

//set view engine
app.set("view engine","hbs");
app.set("views","views");

//connect to database
mongoose.connect("mongodb://localhost:27017/test",(err,coll)=>{
    if(err){
        console.error("Database not connected");
        process.exit(1);
    }
    console.log("Database connected successfully");
}); 

//listening on port 3000 
app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
});