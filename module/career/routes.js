var express = require("express"),
  router = express.Router(),
  controller = require("./index");

router.post("/career", controller.career);

module.exports = router;