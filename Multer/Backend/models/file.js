const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  img: String,
});

module.exports = mongoose.model("users", userSchema);
