const bcrypt = require("bcrypt");

module.exports = {
    generateHashedPassword: (password) => bcrypt.hash(password, 10)
};