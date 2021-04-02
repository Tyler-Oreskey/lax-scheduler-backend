const express = require('express');

const config = require('./src/config');
const { handleError } = require('./src/middleware/error');
const bootstrap = require('./src/bootstrap');
const { JWT } = require('./src/middleware/auth');

const app = express();
const router = express.Router();

// use jwt validation middleware
app.use((req, res, next) => new JWT().authenticated(req, res, next));

// cors configuration
const cors = require('cors');
app.use(cors({ origin: config.origin }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// bootstraps root of router
bootstrap(app, router);

// error handler
app.use((err, req, res, next) => handleError(err, res));

// for aws health checks
app.get('/health', (req, res) => res.send('OK!'));

app.listen(config.port);
