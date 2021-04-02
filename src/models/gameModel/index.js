const { database } = require('../../config');
const knex = require('knex')(database);

class GameModel {
  constructor() {
    this.colTypes = null;
    this.tablename = 'games';
    this.result = null;
  }
  getTablename() {
    return this.tablename;
  }
  getColTypes() {
    this.colTypes = {
      name: String,
      location: String,
      start_date: String,
      end_date: String,
    };
    return this.colTypes;
  }
  getAll() {
    this.result = knex(this.tablename).select('*');
    return this.result;
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
}

module.exports = GameModel;
