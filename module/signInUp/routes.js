var express = require("express"),
  router = express.Router(),
  controller = require("./index");

router.post("/signUp", controller.signUp);
router.post("/signIn", controller.signIn);

module.exports = router;