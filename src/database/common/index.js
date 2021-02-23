const { database } = require("../../config");
const knex = require("knex")(database);

module.exports = {
    getAll: (tablename) => knex.select("*").from(tablename),
    getByID: (tablename, id) => knex.select("*").from(tablename).where({ id }),
    create: (tablename, body) => knex(tablename).insert(body),
    updateByID: (tablename, id, body) => knex(tablename).where({ id }).update(body),
    deleteByID: (tablename, id) => knex(tablename).where({ id }).del()
};