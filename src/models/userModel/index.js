const { database } = require('../../config');

class UserModel {
  constructor() {
    this.colTypes = null;
    this.tablename = 'users';
    this.result = null;
  }
  getTablename() {
    return this.tablename;
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
}

module.exports = UserModel;
