const router = require("express").Router();
const Game = require("../../routes/game");

const game = new Game();

// common routes
router.get("/getAll", game.getAll);
router.get("/getByID/:id", game.getByID);
router.post("/create", game.create);
router.patch("/updateByID/:id", game.updateByID);

module.exports = router;