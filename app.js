//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var passwordValidator = require('password-validator');
const {TextDecoder, TextEncoder} = require("util");
const flash = require("connect-flash");
const session = require("express-session");



//data base connection :
mongoose.connect('mongodb://127.0.0.1:27017/usersDB',{useNewUrlParser: true}).
catch(error => handleError(error));





const regSchema = new mongoose.Schema({ role: String,
FName:  {
    type:String,
    required:true
}, 
Lname:{
    type:String,
    required:true
} ,
role:{
    type:String,
    required:true
} ,
id: {
    type:Number,
    length:9
},
password: {
    type:String,
    required:true,
    min: 7,
    max: 15,
    uppercase:function(){return this.uppercase >=2;},
    digits: function(){return this.digits >=2;}
    
},
pasword:  {
    type:String,
    required:true,
    min: 7,
    max: 15,
    uppercase:function(){return this.uppercase >=2;},
    digits: function(){return this.digits >=2;},
    
},
email: {
    type:String,
    required:true
}});

const User = mongoose.model("User",regSchema);


const app=express();
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());


app.set("view engine","ejs");
app.get('/',function(req,res){
    res.render('Home',{style:'Home.css'});
});
app.post('/Sign-Up.html',async(req,res)=>{

    try{
 
   var role = req.body.role;
    var fname = req.body.Fname;
    var lname = req.body.Lname;
    var id1 = req.body.id;
    var password = req.body.password;
    var repassword = req.body.pasword;
    var email = req.body.email;

    let user = new User( {
        Fname : fname,
        Lname : lname,
        role : role,
        id : id1,
        password :password,
        email:email

    });
    User.findOne({id : id1},function(err, user) {
        if (err) {
          res.json({
            error: err
          })
        }
        if (!user) {
              
                User.save(function(err) {
                  if (!err) {
                    res.redirect("/log-in.html");
                  }
                });
              
        } else {
          req.flash("message", "the user is already exist!");
          res.redirect("/Sign-Up.html");
        }
      });

    }
   catch{console.log(req.body.role);}
    
});



app.listen(3000,function(){
    console.log("Starting Server");
});

