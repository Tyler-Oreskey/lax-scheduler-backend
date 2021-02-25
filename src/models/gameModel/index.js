const { database } = require('../../config');
const knex = require('knex')(database);
const tablename = 'games';

module.exports = {
  getAll: () => knex(tablename).select('*'),
  getByID: (id) => knex(tablename).where({ id }),
  create: (body) => knex(tablename).insert(body),
  updateByID: (id, body) => knex(tablename).where({ id }).update(body),
  getTablename: () => tablename,
  getColTypes: () => ({
    name: String,
    location: String,
    start_date: String,
    end_date: String,
  }),
};
