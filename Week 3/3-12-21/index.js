const express = require("express");
const mongoose = require("mongoose");
const user = require("./Schemas/user.schema");
const post = require("./Schemas/post.schema");
const { signin, signup } = require("./controllers/auth");
const protect = require("./middlewares/token");

const connet = () => {
  return mongoose.connect(
    "mongodb+srv://Sourav:Sourav1999@cluster0.jbmyk.mongodb.net/assignment"
  );
};
const app = express();
app.use(express.json());

app.post("/signup", signup);
app.post("/signin", signin);
app.get("/", async (req, res) => {
  let data = await user.find({}).select("-password").lean().exec();
  res.send(data);
});
app.get("/user", async (req, res) => {
  let payload = await protect(req, res);
  let userData = await user
    .findById(payload.id)
    .select("-password")
    .lean()
    .exec();
  res.send(userData);
});

app.post("/post", async (req, res) => {
  let payload = await protect(req, res);
  let incomingData = req.body;
  let postData = await post.create({ ...incomingData, user: payload.id });
  res.send({ ...incomingData, _id: postData._id });
});

app.get("/post", async (req, res) => {
  let payload = await protect(req, res);
  let postData = await post
    .find({ user: payload.id })
    .lean()
    .select("-user")
    .exec();
  res.send(postData);
});

const start = async () => {
  await connet();
  app.listen(80, () => {
    console.log("Server Started");
  });
};

start();
