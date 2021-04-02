const { database } = require('../../config');
const knex = require('knex')(database);

class UserModel {
  constructor() {
    this.colTypes = null;
    this.tablename = 'users';
    this.result = null;
  }
  getColTypes() {
    this.colTypes = {
      first_name: String,
      last_name: String,
      email: String,
      password: String,
      is_email_verified: Boolean,
      receive_emails: Boolean,
    };
    return this.colTypes;
  }
  getByID(id) {
    this.result = knex(this.tablename).where({ id });
    return this.result;
  }
  create(body) {
    this.result = knex(this.tablename).insert(body);
    return this.result;
  }
  updateByID(id, body) {
    this.result = knex(this.tablename).where({ id }).update(body);
    return this.result;
  }
  getByEmailNoPass(email) {
    this.result = knex(this.tablename)
      .first('id', 'first_name', 'last_name', 'email', 'is_email_verified')
      .where({ email });
    return this.result;
  }
  getPasswordByEmail(email) {
    this.result = knex(this.tablename).first('password').where({ email });
    return this.result;
  }
}

module.exports = UserModel;
