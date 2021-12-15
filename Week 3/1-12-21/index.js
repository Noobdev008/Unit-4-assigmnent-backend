const express = require("express");
const mongoose = require("mongoose");
const user = require("./Schemas/user.schema");
const gallary = require("./Schemas/gallary.schema");
const upload = require("./utils/file.upload");
const connet = () => {
  return mongoose.connect(
    "mongodb+srv://shubham.sri998@cluster0.jbmyk.mongodb.net/assignment"
  );
};
const app = express();
app.use(express.json());

app.post("/", upload.single("profile_pic"), async (req, res) => {
  console.log("ok");
  const userProfile = await user.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    profile_pic: req.file.path,
  });
  res.send(userProfile);
});

app.post("/multiple/id=:id", upload.any("gallary_pic"), async (req, res) => {
  const files = req.files.map((file) => file.path);
  const gallaryProfile = await gallary.create({
    userId: req.params.id,
    gallary_pics: files,
  });
  res.send(gallaryProfile);
});

const start = async () => {
  await connet();
  app.listen(80, () => {
    console.log("Server Started");
  });
};

start();
