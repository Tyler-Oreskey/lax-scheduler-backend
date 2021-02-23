const CommonRoutes = require("../common");

class Game extends CommonRoutes {
    constructor() {
        super("games", {
            name: String,
            location: String,
            start_date: String,
            end_date: String
        });
    }
}

module.exports = Game;