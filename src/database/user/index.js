const { database } = require("../../config");
const knex = require("knex")(database);
const tablename = "users";

module.exports = {
    create: (body) => knex(tablename).insert(body),
    getTablename: () => tablename,
    getColTypes: () => ({
        first_name: String,
        last_name: String,
        email: String,
        password: String,
        is_email_verified: Boolean,
        receive_emails: Boolean
    })
};