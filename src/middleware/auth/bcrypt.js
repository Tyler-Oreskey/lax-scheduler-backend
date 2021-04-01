const bcrypt = require('bcrypt');

class Bcrypt {
  constructor() {
    this.salts = 10;
    this.password = null;
    this.comparedPassword = null;
    this.passwordsMatch = false;
  }
  // assign hashed password to user
  generatePassword(password) {
    this.password = bcrypt.hash(password, this.salts);
    return this.password;
  }
  // compare passwords
  comparePassword(password, comparedPassword) {
    this.password = password;
    this.comparedPassword = comparedPassword;
    this.passwordsMatch = bcrypt.compare(this.password, this.comparedPassword);
    return this.passwordsMatch;
  }
}

module.exports = Bcrypt;
