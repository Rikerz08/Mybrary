//this is a model file for js to contact database thru MVC
const mongoose = require("mongoose");

// create schema just like a table
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Author", authorSchema);
