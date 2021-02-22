require("dotenv").config();

module.exports = {
    port: process.env.PORT || 8000,
    origin: process.env.ORIGIN || "localhost:3000"
}