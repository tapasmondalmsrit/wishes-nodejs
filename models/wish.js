const mongoose = require("mongoose");

const wishSchema = mongoose.Schema({
  wish: String,
});

module.exports = mongoose.model("wishes", wishSchema);
