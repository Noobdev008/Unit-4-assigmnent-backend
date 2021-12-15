const user = require("../Schemas/user.schema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
      if (err) return reject(err);
      return resolve(payload);
    });
  });
}
const protect = (req, res) => {
  return new Promise(async (resolve, reject) => {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
      return res.send("Invalid token");
    }
    const token = bearer.split("Bearer ")[1].trim();
    let payload = await verifyToken(token);
    return resolve(payload);
  });
};

module.exports = protect;
