const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
