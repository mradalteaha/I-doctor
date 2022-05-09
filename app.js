//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
var passwordValidator = require('password-validator');
const flash = require("connect-flash");
const session = require("express-session");
const ejs = require("ejs");
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

const messages = new mongoose.Schema({
  sender:Number,
  reciever:Number,
  Subject:String,
  Mbody:String,
  sent:Date});
  

const User = mongoose.model("User",regSchema);
const uMessage = mongoose.model("uMessage",messages);
const bloodtestSchema = new mongoose.Schema({
  id: String,
  wbc: String,
  neut: String,
  lymph: String,
  rbc: String,
  hct: String,
  urea: String,
  hb: String,
  creatine: String,
  iron: String,
  ap: String,

});
const BloodTest = mongoose.model("BloodTest",bloodtestSchema);

const app=express();
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());

var LoggedInUser;
 

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());




app.get('/Doctor', (req, res) => {

  console.log("************************");
  console.log(LoggedInUser);
  console.log("************************");
 let doctor;
 try{
   User.find({},function(err,users){

    uMessage.find({},function(err,message){
    res.render('Doctor.ejs',{doctor:req.session.user,patientslist:users,messagess:message});
    })

   });
 

});



app.get('/Patient',function(req,res){
  
  console.log("************************");
  console.log(LoggedInUser);
  console.log("************************");
  User.find({},function(err,users){

    res.render('Patient.ejs',{p:req.session.user,userslist:users});


   });

});




app.get('/Doctortest',function(req,res){
  console.log("************************");
  console.log(LoggedInUser);
  console.log("************************");
  let doctor;
  User.find({},function(err,users){

   res.render('Doctortest.ejs',{doctor:req.session.user,patientslist:users});


  });
});
app.get('/Examinator',function(req,res){
  console.log("************************");
  console.log(LoggedInUser);
  console.log("************************");
  res.render('Examinator',{p:req.session.user});
});


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
app.get('/Examinator',function(req,res){
  res.render('Examinator', {
    message: req.flash("message")
  });
});

app.get('/BloodTestValues',function(req,res){
  res.render('BloodTestValues', {
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

  app.post('/BloodTestValues',function(req,res){

    let test = new BloodTest( {
      id : req.body.id,
      age:req.body.age,
      wbc :req.body.wbc,
      neut:req.body.neut,
      lymph:req.body.lymph,
      rbc:req.body.rbc,
      hct:req.body.hct,
      urea:req.body.urea,
      hb:req.body.hb,
      creatine:req.body.creatine,
      iron:req.body.iron,
      ap:req.body.ap
  });
    console.log("blood test enterd");
    test.save(function(err) {
      if (!err) {
        
        console.log(test);
        return res.redirect('/Examinator');
      }
    });
    
  });

app.post('/Sign-Up',(req,res)=>{

    
 
try{

    let users = new User( {
        role : req.body.role,
        FirstName : req.body.Fname,
        LastName : req.body.Lname,
        id : req.body.id,
        password :req.body.password,
        email:req.body.email,
        Gender:req.body.gender,
        Age:req.body.age,
        Phone:req.body.Phone,
        Birthdate:req.body.birthdate,
        Specialist:req.body.Specialist
    });


    
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
    }catch{

    return res.redirect("/Sign-Up");

  }
  
    
  });


  app.post('/Log-In', (req, res)=> {

try{
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


        if (req.body.Password === user.password) {
          console.log(user);
          LoggedInUser = user.FirstName;
          console.log("\n inside the login\n");

         
          req.session.user = user ;
          console.log(req.session.user);
          if (user.role === "Doctor") {
            myfunc();
            console.log("doctor login");

            return res.redirect("/Doctortest");
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
  }catch{
      return res.redirect("/Log-In");

    }
  });


  app.post('/Patient',function(req,res){

    console.log("inside patient post");
  
    var date = new Date();
    let newmessage = new uMessage( {
      sender:req.body.sender,
      reciever:req.body.doctorid,
      Subject:req.body.Subject,
      Mbody:req.body.Message,
      sent:date
  }
  );
  console.log(newmessage)


  try {
    uMessage.findOne({
      _id: req.body.id,
  
    }, async function(err, msg) {
      if (err) {
  
        res.json({
          error: err
        })
      }
      if (!msg) {
  
  
              await newmessage.save(function(err) {
                if (!err) {
                  
                  console.log(newmessage);
                  return res.redirect('/Patient');
                }
              });
           
          
  
  
      } 
    });

  } catch (err) {
    logger.error('Mongo error', err);
    return res.status(500).send();
  }

  
  
  console.log("message sent");

   
  
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


  

app.listen(3000,()=>{
    console.log("Starting Server");
});

function initMap() {
  // The location of Uluru
  var uluru = {
      lat: -25.344,
      lng: 131.036
  };
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {
          zoom: 4,
          center: uluru
      });
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({
      position: uluru,
      map: map
  });
}
