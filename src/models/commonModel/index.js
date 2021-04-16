const { database } = require('../../config');
const knex = require('knex')(database);

// class used for common queries.
class CommonModel {
  constructor() {
    this.tableName = null;
    this.result = null;
    this.queryData = null;
    this.query = null;
  }
  // Get items from database when provided proper query data.
  get(tableName, queryData) {
    if (!tableName || !queryData) {
      return null;
    }
    this.tableName = tableName;
    this.queryData = queryData;
    if (!this.queryData.columns) {
      return null;
    }
    this.query = knex.select(...this.queryData.columns).from(this.tableName);
    if (this.queryData.whereClause) {
      this.query = this.query.where(this.queryData.whereClause);
    }
    this.result = this.query;
    return this.result;
  }
  // Create row in database given proper query data.
  create(tableName, queryData) {
    if (!tableName || !queryData) {
      return null;
    }
    this.tableName = tableName;
    this.queryData = queryData;
    if (!this.queryData.body) {
      return null;
    }
    this.query = knex(this.tableName).insert(this.queryData.body);
    if (this.queryData.returning) {
      this.query = this.query.returning(this.queryData.returning);
    }
    this.result = this.query;
    return this.result;
  }
  // Update row in database given proper query data.
  update(tableName, queryData) {
    if (!tableName || !queryData) {
      return null;
    }
    this.tableName = tableName;
    this.queryData = queryData;
    if (!this.queryData.whereClause || !this.queryData.body) {
      return null;
    }
    this.query = knex(this.tableName)
      .where(this.queryData.whereClause)
      .update(this.queryData.body);
    if (this.queryData.returning) {
      this.query = this.query.returning(this.queryData.returning);
    }
    this.result = this.query;
    return this.result;
  }
}

module.exports = CommonModel;
