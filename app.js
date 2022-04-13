//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {TextDecoder, TextEncoder} = require("util");
database.connect('mongodb://127.0.0.1:27017/usersDB',{useNewUrlParser: true});




const regSchema = new mongoose.Schema({ role: String,
Name: [ String, String ],
id: Number,
password: String,
pasword: String,
email: String});

const User = mongoose.model("User",regSchema);


const app=express();
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended:true}));


app.set("view engine","ejs");
app.get('/',function(req,res){
    res.render('Home',{style:'Home.css'});
});
app.post('/Sign-Up.html',function(req,res){
    console.log(req.body);
});



app.listen(3000,function(){
    console.log("Starting Server");
});

