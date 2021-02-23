const router = require("express").Router();
const { game } = require("../../database");
const Game = require("../../routes/game");

const tablename = game.getTablename();
const colTypes = game.getColTypes();

const newGame = new Game(tablename, colTypes);

// common routes
router.get("/getAll", newGame.getAll);
router.get("/getByID/:id", newGame.getByID);
router.post("/create", newGame.create);
router.patch("/updateByID/:id", newGame.updateByID);

module.exports = router;