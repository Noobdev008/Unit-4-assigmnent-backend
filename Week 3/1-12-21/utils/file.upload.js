// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, path.join(__dirname, "../uploads"));
//     console.log(path.join(__dirname, "../uploads"));
//   },
//   filename: function (req, file, callback) {
//     callback(null, new Date().toISOString() + file.originalname);
//   },
// });

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, callback) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniquePrefix + "-" + file.originalname);
  },
});

function fileFilter(req, file, callback) {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 100, // bytes * kb * number
  },
});
