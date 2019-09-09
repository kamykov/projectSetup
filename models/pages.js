const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const pageSchema = new mongoose.Schema({
  id: String,
  title: String,
  translation: String,
  subtitle: String,
  headline: String,
  img: String,
  content: { type: Map, of: String },
  date: Date
});

module.exports = Page = mongoose.model("Page", pageSchema);
