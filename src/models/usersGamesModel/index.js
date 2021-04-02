const { database } = require('../../config');
const knex = require('knex')(database);

class UsersGamesModel {
  constructor() {
    this.colTypes = null;
    this.tablename = 'users_games_assign';
    this.result = null;
  }
  getColTypes() {
    this.colTypes = {
      user_id: Number,
      game_id: Number,
    };
    return this.colTypes;
  }
  getUsersByGameID(id) {
    this.result = knex(this.tablename).select('*').where({ user_id });
  }
  getGamesByUserID(user_id) {
    this.result = knex(this.tablename).select('*').where({ user_id });
    return this.result;
  }
  addUserToGameByID(body) {
    this.result = knex(this.tablename).insert(body);
    return this.result;
  }
  deleteUserFromGameByID(body) {
    this.result = knex(this.tablename).where(body).del();
    return this.result;
  }
}

module.exports = UsersGamesModel;
