const { UsersGamesModel } = require('../../models');
const { ErrorHandler } = require('../../middleware/error');
const validation = require('../../validation');
const validationRules = new UsersGamesModel().getColTypes();

module.exports = {
  getGamesByUserID: async (req, res, next) => {
    try {
      const isValidID = validation.validateNumber(req.params.user_id);

      if (!isValidID) {
        throw new ErrorHandler(400, 'Invalid ID provided!');
      }

      const result = await new UsersGamesModel().getGamesByUserID(
        req.params.user_id
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  addUserToGameByID: async (req, res, next) => {
    try {
      const ids = { ...req.params, ...req.body };

      const isValidBody = validation.validateObjectTypes(
        ids,
        validationRules,
        true
      );

      if (!isValidBody) {
        throw new ErrorHandler(400, 'Invalid request body!');
      }

      await new UsersGamesModel().addUserToGameByID(ids);
      return res.status(200).json({ message: 'Success!' });
    } catch (error) {
      next(error);
    }
  },
  deleteUserFromGameByID: async (req, res, next) => {
    try {
      const ids = { ...req.params, ...req.body };

      const isValidBody = validation.validateObjectTypes(
        ids,
        validationRules,
        true
      );

      if (!isValidBody) {
        throw new ErrorHandler(400, 'Invalid request body!');
      }

      await new UsersGamesModel().deleteUserFromGameByID(ids);
      return res.status(200).json({ message: 'Success!' });
    } catch (error) {
      next(error);
    }
  },
};
