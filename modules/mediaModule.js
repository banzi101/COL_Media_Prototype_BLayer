const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  mediaName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Media", mediaSchema);