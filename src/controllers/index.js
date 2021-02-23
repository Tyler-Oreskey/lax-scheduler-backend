const router = require("express").Router();

router.use("/games", require("./games"));
router.use("/users", require("./users"));

module.exports = router;