const CommonRoutes = require('../common');

class Game extends CommonRoutes {
  constructor(tablename, colTypes) {
    super(tablename, colTypes);
    this.tablename = tablename;
    this.colTypes = colTypes;
  }
}

module.exports = Game;
