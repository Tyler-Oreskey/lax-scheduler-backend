const router = require("express").Router();
const route = require("../../routes/users");

router.get("/getAll", route.getAll);
router.get("/getByID/:id", route.getByID);
router.post("/create", route.create);
router.patch("/updateByID/:id", route.updateByID);
router.delete("/deleteByID/:id", route.deleteByID);

module.exports = router;