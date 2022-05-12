const mongoose = require('mongoose');
var passwordValidator = require('password-validator');

mongoose.connect('mongodb+srv://moradte:Mrad_1999@idoctor.1lmf0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true});



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