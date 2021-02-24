const bcrypt = require("bcrypt");

module.exports = {
    generateHashedPassword: (password) => bcrypt.hash(password, 10),
    compareHashedPassword: (password, dbPassword) => bcrypt.compare(password, dbPassword)
};