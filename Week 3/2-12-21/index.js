const express = require("express");
const {
  body,
  validationResult,
  check,
  checkSchema,
} = require("express-validator");
const mongoose = require("mongoose");
const user = require("./Schemas/user.schema");

const connet = () => {
  return mongoose.connect(
    "mongodb+srv://Sourav:Sourav1999@cluster0.jbmyk.mongodb.net/assignment"
  );
};
const app = express();
app.use(express.json());

app.post(
  "/user",
  // username must be an email
  body("email").isEmail(),
  // password must be at least 5 chars long
  body("first_name").isLength({ min: 1 }),
  body("last_name").isLength({ min: 1 }),
  body("pincode").isLength({ min: 6, max: 6 }),
  body("age").isLength({ min: 2, max: 3 }),
  check("gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid Gender"),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let data = await user.create(req.body);
    return res.send(data);
  }
);

const start = async () => {
  await connet();
  app.listen(80, () => {
    console.log("Server Started");
  });
};

start();
