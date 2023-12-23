var express = require("express"),
  router = express.Router(),
  controller = require("./index");

router.get("/getUsers", controller.getAllUsers);

module.exports = router;