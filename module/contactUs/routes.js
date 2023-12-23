var express = require("express"),
  router = express.Router(),
  controller = require("./index");

router.post("/contactUs", controller.contactUs);

module.exports = router;