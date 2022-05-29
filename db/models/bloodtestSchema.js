//jshint esversion:6
const mongoose = require('mongoose');

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
  const BloodTests = mongoose.model("BloodTests", bloodtestSchema);

  module.exports = { BloodTests };