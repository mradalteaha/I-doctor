//jshint esversion:6
const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({
    role: String,
    FirstName: String,
    LastName: String,
    id: Number,
    password: String,
    email: String,
    Gender: String,
    Age: Number,
    Phone: Number,
    Birthdate: Date,
    Specialist: String,
  });




const User = mongoose.model("User", regSchema);
module.exports = { User };