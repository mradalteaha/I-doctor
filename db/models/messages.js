//jshint esversion:6
const mongoose = require('mongoose');

const messages = new mongoose.Schema({
    sender: Number,
    reciever: Number,
    Subject: String,
    Mbody: String,
    sent: Date
  });


  const uMessage = mongoose.model("uMessage", messages);
  module.exports = { uMessage };


