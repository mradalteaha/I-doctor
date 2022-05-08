//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
var passwordValidator = require('password-validator');
const flash = require("connect-flash");
const session = require("express-session");
const { strictEqual } = require('assert');
const dotenv = require('dotenv').config()



var passport = require("passport");
var engines = require('consolidate');
const { connect } = require('http2');



//data base connection :
mongoose.connect('mongodb+srv://moradte:Mrad_1999@idoctor.1lmf0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true}).catch(error => handleError(error));



const regSchema = new mongoose.Schema({
role: String,
FirstName: String, 
LastName:String,
id: Number,
password:String,
email: String,
Gender:String,
Age:Number,
Phone:Number,
Birthdate:Date,
Specialist:String
});

const User = mongoose.model("User",regSchema);

const app=express();
app.use(express.static('views'));
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());

var LoggedInUser;
var userslist=[];
 

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/Doctor',function(req,res){
  console.log("************************");
  console.log(LoggedInUser);
  console.log("************************");
 

  
myfunct();
   
  
  res.render('Doctor',{asd:LoggedInUser,patientslist:userslist});
});


function myfunct(){
  


  var i=0;
  User.find({}, function(err, users) {
    users.forEach(function(user) {
      userslist[i] = user;
      i++;
    });
  });

  render("/Doctor");

}

app.set("view engine","ejs");
app.get('/',function(req,res){
    res.render('Home.html',{style:'Home.css'});
});
app.get('/Sign-Up',function(req,res){
  res.render('Sign-Up', {
    message: req.flash("message")
  });
});
app.get('/Home',function(req,res){
  res.render('Home.html', {
    message: req.flash("message")
  });
});
app.get('/Log-in',function(req,res){
  res.render('Log-In.html', {
    message: req.flash("message")
  });
});

app.get('/ForgotPW',function(req,res){
  res.render('ForgotPW.html', {
    message: req.flash("message")
  });
});


var passwordschema = new passwordValidator();

passwordschema
  .is().max(15)
  .is().min(7)
  .has().uppercase() 
  .has().not().spaces()
  .has().digits(2) ;


app.post('/Sign-Up',function(req,res){

    
 


    let users = new User( {
        role : req.body.role,
        FirstName : req.body.Fname,
        LastName : req.body.Lname,
        id : req.body.id,
        password :req.body.password,
        email:req.body.email,
        Gender:req.body.gender,
        Age:req.body.age,
        Phone:req.body.phone,
        Birthdate:req.body.birthdate,
        Specialist:req.body.Specialist
    });
    console.log(req.body.id);
    
    User.findOne({
        id: req.body.id,

      }, function(err, user) {
        if (err) {

          res.json({
            error: err
          })
        }
        if (!user) {

          if (passwordschema.validate(req.body.password) && (req.body.password === req.body.pasword)) {

                users.save(function(err) {
                  if (!err) {
                    
                    console.log(user);
                    return res.redirect('/Log-In');
                  }
                });
             
            
  
          } else {
            return res.redirect("/Sign-Up");
          };
  
        } else {
           console.log("the user is already exist!");
          return res.redirect("/Sign-Up");
        }
      });
  
  
    
  });


  app.post('/Log-In', function(req, res) {
    var  password = req.body.Password;
    User.findOne({
      id: req.body.id,
  
    }, function(err, user) {
      if (err) { // user doesn't exist
        res.json({
          error: err
        })
      }
      if (user) { //user exist

        console.log(user);

        if (req.body.Password === user.password) {
          console.log(user);
          LoggedInUser = user.FirstName;
          if (user.role === "Doctor") {
            console.log("doctor login");

            return res.redirect("/Doctor");
          } else if (user.role === "Examinator") {
            return res.redirect("/Examinator");
          } else {
            return res.redirect("/Patient");
          }
        } else {
         return  res.redirect("/Log-In");
        }
      } else {
        return res.redirect("/Log-In");
      }
    });
  });


  app.post('/ForgotPW', function(req, res) {
    var  password = req.body.Password;

    User.findOne({
      id: req.body.id,
  
    }, function(err, user) {
      if (err) { // user doesn't exist
        res.json({
          error: err
        })
      }
      if (user) { //user exist

        console.log(user);

        if (req.body.id == user.id && req.body.email == user.email ) {

          if(req.body.newpass === req.body.confnewpass){

            User.updateOne({ id: user.id }, { password: req.body.newpass }, function(err, reas) {
              if(err){
                console.log("couldn't change password");
              }
              else{
                console.log("password changed successfully");
                return  res.redirect("/Log-In"); 
              }
            });


          }
          else{
            console.log("passwords doesn't match");
          }


          
         
        } else {
          console.log("email and password doesn't match ");
         return  res.redirect("/ForgotPW");
        }
      } else {
        console.log("user doesn't exist");
        return res.redirect("/ForgotPW");
      }
    });
  });


  

app.listen(3000,function(){
    console.log("Starting Server");
});

