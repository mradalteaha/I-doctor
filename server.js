const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://moradte:Mrad_1999@idoctor.1lmf0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true}).catch(error => handleError(error));
var app = require("./app.js");


app.listen(3000,()=>{
    console.log("Starting Server");
});
