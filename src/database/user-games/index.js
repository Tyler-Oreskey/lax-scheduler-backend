const { database } = require("../../config");
const knex = require("knex")(database);
const tablename = "users_games_assign";

module.exports = {
    getGamesByUserID: (id) => knex(tablename).select("*").where({ user_id: id }),
    getTablename: () => tablename,
    getColTypes: () => ({
        user_id: Number,
        game_id: Number
    })
}