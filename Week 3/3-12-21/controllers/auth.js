const jwt = require("jsonwebtoken");
require("dotenv").config();

const user = require("../Schemas/user.schema");

const newtoken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_KEY);
};
const signup = async (req, res) => {
  const userData = await user.create(req.body);
  const token = newtoken(userData);
  res.send(token);
};

const signin = async (req, res) => {
  let userData = await user.findOne({ email: req.body.email }).exec();
  if (!userData) return res.send("User not present");
  const match = await userData.checkPassword(req.body.password);
  if (!match) return res.send("Email or Password not correct");
  const token = newtoken(userData);
  res.send(token);
};

module.exports = {
  signup,
  signin,
};
