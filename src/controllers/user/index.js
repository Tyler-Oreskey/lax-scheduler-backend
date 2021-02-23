const router = require("express").Router();
const User = require("../../routes/user");

const user = new User();

// common routes
router.get("/getAll", user.getAll);
router.get("/getByID/:id", user.getByID);
router.post("/create", user.create);
router.patch("/updateByID/:id", user.updateByID);

// locaL routes
router.get("/getGamesByUserID/:id", user.getGamesByUserID);

module.exports = router;