const mongoose = require("mongoose");

const philosophySchema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
});

const Philosophy = mongoose.model("philosophy", philosophySchema);

module.exports = Philosophy;
