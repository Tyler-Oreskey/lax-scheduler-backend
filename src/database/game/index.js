const { database } = require("../../config");
const knex = require("knex")(database);
const tablename = "games";

module.exports = {
    getTablename: () => tablename,
    getColTypes: () => ({
        name: String,
        location: String,
        start_date: String,
        end_date: String
    })
};