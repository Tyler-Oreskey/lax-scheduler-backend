const games = require("./games");

module.exports = (router) => {
    return [
        router.use("/games", games(router))
    ]
}