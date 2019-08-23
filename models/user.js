const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  date: Date
});

module.exports = User = mongoose.model("User", userSchema);
