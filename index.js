const express = require("express");
const app = express();
const router = express.Router();

const cors = require("cors");
const bodyParser = require("body-parser");

const config = require("./src/config");
const controllers = require("./src/controllers");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors({ origin: config.origin }));
app.get("/health", (req, res) => res.send("OK!"));
app.use(controllers(router));

app.listen(config.port, () => console.log(`App listeing on port ${config.port}`))
