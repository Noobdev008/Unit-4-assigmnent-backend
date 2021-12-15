const mongoose = require("mongoose");

const gallarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  gallary_pics: [String],
});

const user = mongoose.model("gallaries", gallarySchema);

module.exports = user;
