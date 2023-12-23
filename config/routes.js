const express = require("express"),
  router = express.Router();

router.use(require("../module/signInUp/routes"));
router.use(require("../module/users/routes"));
router.use(require("../module/contactUs/routes"));
router.use(require("../module/career/routes"));

module.exports = router;