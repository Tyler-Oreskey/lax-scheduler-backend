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
}

module.exports = GameModel;
