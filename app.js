const express = require('express');
const bodyParser = require('body-parser');

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
app.post('/',function(req,res){
    console.log(req.body);
});


app.listen(3000,function(){
    console.log("Starting Server");
});

