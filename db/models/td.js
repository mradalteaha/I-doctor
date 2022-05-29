const mongoose = require('mongoose');
const TDschema = new mongoose.Schema({
    id: String,
    Treatment: String,
    Diseases: String
  });
  const tds = mongoose.model("td", TDschema);

  module.exports = { tds };