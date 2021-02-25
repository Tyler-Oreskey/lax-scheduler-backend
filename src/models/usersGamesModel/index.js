const { database } = require('../../config');
const knex = require('knex')(database);

const tablename = 'users_games_assign';

module.exports = {
  getGamesByUserID: (user_id) => knex(tablename).select('*').where({ user_id }),
  addUserToGame: (body) => knex(tablename).insert(body),
  removeUserFromGame: (body) => knex(tablename).where(body).del(),
  getTablename: () => tablename,
  getColTypes: () => ({
    user_id: Number,
    game_id: Number,
  }),
};
