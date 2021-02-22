const route = require("../../routes/games");

module.exports = (router) => {
    return [
        router.get("/getAll", route.getAll),
        router.get("/getByID/:id", route.getByID),
        router.post("/create", route.create),
        router.patch("/updateByID/:id", route.updateByID),
        router.delete("/deleteByID/:id", route.deleteByID)
    ]
}