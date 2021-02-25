const { usersGamesModel } = require('../../models');
const { ErrorHandler } = require('../../middleware/error');
const validation = require('../../validation');

const validationRules = usersGamesModel.getColTypes();

module.exports = {
  getGamesByUserID: async (req, res, next) => {
    try {
      const isValidID = validation.validateNumber(req.params.user_id);

      if (!isValidID) {
        throw new ErrorHandler(400, 'Invalid ID provided!');
      }

      const result = await usersGamesModel.getGamesByUserID(req.params.user_id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  addUserToGame: async (req, res, next) => {
    try {
      const isValidBody = validation.validateObjectTypes(
        req.body,
        validationRules,
        true
      );

      if (!isValidBody) {
        throw new ErrorHandler(400, 'Invalid request body!');
      }

      await usersGamesModel.addUserToGame(req.body);
      return res.status(200).json({ message: 'Success!' });
    } catch (error) {
      next(error);
    }
  },
  removeUserFromGame: async (req, res, next) => {
    try {
      const isValidBody = validation.validateObjectTypes(
        req.body,
        validationRules,
        true
      );

      if (!isValidBody) {
        throw new ErrorHandler(400, 'Invalid request body!');
      }

      await usersGamesModel.removeUserFromGame(req.body);
      return res.status(200).json({ message: 'Success!' });
    } catch (error) {
      next(error);
    }
  },
};
