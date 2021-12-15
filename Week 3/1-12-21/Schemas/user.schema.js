const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  profile_pic: [String],
});

const user = mongoose.model("users", userSchema);

module.exports = user;
