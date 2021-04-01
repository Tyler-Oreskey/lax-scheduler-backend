const { database } = require('../../config');
const knex = require('knex')(database);

const tablename = 'users';

module.exports = {
  getAll: () => knex(tablename).select('*'),
  getByID: (id) => knex(tablename).where({ id }),
  create: (body) => knex(tablename).insert(body),
  updateByID: (id, body) => knex(tablename).where({ id }).update(body),
  getByEmailNoPass: (email) =>
    knex(tablename)
      .first('id', 'first_name', 'last_name', 'email', 'is_email_verified')
      .where({ email }),
  getPasswordByEmail: (email) =>
    knex(tablename).first('password').where({ email }),
  getTablename: () => tablename,
  getColTypes: () => ({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    is_email_verified: Boolean,
    receive_emails: Boolean,
  }),
};
