const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./src/config");
const controllers = require("./src/controllers");
const { handleError } = require("./src/middleware/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors({ origin: config.origin }));
app.get("/health", (req, res) => res.send("OK!"));
app.use(controllers(router));
app.use((err, req, res, next) => handleError(err, res));

app.listen(config.port, () => console.log(`App listeing on port ${config.port}`))
