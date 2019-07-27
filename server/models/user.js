const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  date: Date
});

module.exports = mongoose.model("User", userSchema);
