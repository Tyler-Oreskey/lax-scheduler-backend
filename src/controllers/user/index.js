const router = require("express").Router();
const { user } = require("../../database");
const User = require("../../routes/user");

const tablename = user.getTablename();
const colTypes = user.getColTypes();

const newUser = new User(tablename, colTypes);

// common routes
router.get("/getAll", newUser.getAll);
router.get("/getByID/:id", newUser.getByID);
router.post("/create", newUser.create);
router.patch("/updateByID/:id", newUser.updateByID);

// locaL routes
router.get("/getGamesByUserID/:id", newUser.getGamesByUserID);

module.exports = router;