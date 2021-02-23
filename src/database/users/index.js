const { database } = require("../../config");
const knex = require("knex")(database);
const tablename = "users";

module.exports = {
    getAll: () => knex.select("*").from(tablename),
    getByID: (id) => knex.select("*").from(tablename).where({ id }),
    create: (body) => knex(tablename).insert(body),
    updateByID: (id, body) => knex(tablename).where({ id }).update(body),
    deleteByID: (id) => knex(tablename).where({ id }).del()
};