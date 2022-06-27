const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
  tech: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  attention: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('log', LogSchema);
