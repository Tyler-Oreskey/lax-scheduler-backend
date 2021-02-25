const userRoute = require('./userRoute');
const gameRoute = require('./gameRoute');
const usersGamesRoute = require('./usersGamesRoute');

exports.appRoute = (router) => {
  router.use('/user', userRoute);
  router.use('/game', gameRoute);
  router.use('/usersGames', usersGamesRoute);
  return router;
};
