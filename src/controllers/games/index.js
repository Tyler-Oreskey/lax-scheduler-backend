const route = require("../../routes/games");

module.exports = (router) => {
    return [
        router.get("/getAll", route.getAll)
    ]
}