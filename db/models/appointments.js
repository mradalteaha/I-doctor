//jshint esversion:6
const mongoose = require('mongoose');


const appointments = new mongoose.Schema({
    patient: Number,
    doctor: Number,
    Date: String
  });



  const Appointment = mongoose.model("Appointment", appointments);

  module.exports = { Appointment };