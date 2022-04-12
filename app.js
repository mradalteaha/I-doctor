const express = require('express');
const app=express();
app.use(express.static('views'));

app.set("view engine","ejs");
app.get('/',function(req,res){
    res.render('Home',{style:'Home.css'});
});
app.listen(3000,function(){
    console.log("Starting Server");
});

