const { database } = require("../../config");
const knex = require("knex")(database);
const tablename = "users";

module.exports = {
    create: (body) => knex(tablename).insert(body),
    getByEmailNoPass: (email) => knex(tablename)
        .first("first_name", "last_name", "email", "is_email_verified").where({ email }),
    getPasswordByEmail: (email) => knex(tablename).first("password").where({ email }),
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