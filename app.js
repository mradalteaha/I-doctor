//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var passwordValidator = require('password-validator');
const {TextDecoder, TextEncoder} = require("util");
const flash = require("connect-flash");
const session = require("express-session");
const { strictEqual } = require('assert');



//data base connection :
mongoose.connect('mongodb://127.0.0.1:27017/usersDB',{useNewUrlParser: true});
//catch(error => handleError(error));





const regSchema = new mongoose.Schema({ role: String,
FName: String, 
Lname:String,
role:String,
id: Number,
password:String,
pasword: String,
email: String});

const User = mongoose.model("User",regSchema);

const app=express();
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());


app.set("view engine","ejs");
app.get('/',function(req,res){
    res.render('Home',{style:'Home.css'});
});

var passwordschema = new passwordValidator();

passwordschema
  .is().max(15)
  .is().min(7)
  .has().uppercase() 
  .has().not().spaces()
  .has().digits(2) ;


app.post('/Sign-Up.html',async(req,res)=>{

    try{
 


    let users = new User( {
        Fname : req.body.Fname,
        Lname : req.body.Lname,
        role : req.body.role,
        id : req.body.id,
        password :req.body.password,
        email:req.body.email

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

          if (passwordschema.validate(req.body.password)) {

                users.save(function(err) {
                  if (!err) {
                    console.log("success user registeration");

                    return res.render("/index.html");
                  }
                });
             
            
  
          } else {
            return res.render("/Sign-Up.html");
          };
  
        } else {
           console.log("the user is already exist!");
          return res.render("/Sign-Up.html");
        }
      });
  
  
    } catch {
        return res.render("/Sign-Up.html");
    }
  });



app.listen(3000,function(){
    console.log("Starting Server");
});

