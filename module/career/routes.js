var express = require("express"),
  router = express.Router(),
  multer = require("multer"),
  { uuid } = require("uuidv4"),
  controller = require("./index");

const DIR = "./assets/images/cv";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
});

router.post("/career", upload.single("cv"), controller.career);

module.exports = router;
