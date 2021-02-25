const { appRoute } = require('./routes');

module.exports = (app, router) => {
  app.use('/', appRoute(router));
};
