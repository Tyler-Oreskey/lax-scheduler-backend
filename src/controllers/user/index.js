const router = require("express").Router();
const User = require("../../routes/user");

const user = new User();

router.get("/getAll", user.getAll);
router.get("/getByID/:id", user.getByID);
router.post("/create", user.create);
router.patch("/updateByID/:id", user.updateByID);
router.delete("/deleteByID/:id", user.deleteByID);

module.exports = router;