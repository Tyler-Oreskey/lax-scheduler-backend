const express = require('express');
const bodyParser = require('body-parser');

const config = require('./src/config');
const { handleError } = require('./src/middleware/error');
const bootstrap = require('./src/bootstrap');

const app = express();
const router = express.Router();

// const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
bootstrap(app, router);

app.use((err, req, res, next) => handleError(err, res));
// app.use(cors({ origin: config.origin }));

app.get('/health', (req, res) => res.send('OK!'));
app.listen(config.port);
