const { GameModel } = require('../../models');
const { ErrorHandler } = require('../../middleware/error');
const validation = require('../../validation');
const validationRules = new GameModel().getColTypes();

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const result = await new GameModel().getAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  getByID: async (req, res, next) => {
    try {
      const isValidID = validation.validateNumber(req.params.id);
      if (!isValidID) {
        throw new ErrorHandler(400, 'Invalid ID provided!');
      }
      const result = await new GameModel().getByID(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const isValidBody = validation.validateObjectTypes(
        req.body,
        validationRules,
        true
      );
      if (!isValidBody) {
        throw new ErrorHandler(400, 'Invalid request body!');
      }
      await new GameModel().create(req.body);
      return res.status(200).json({ message: 'Success!' });
    } catch (error) {
      next(error);
    }
  },
  updateByID: async (req, res, next) => {
    try {
      const isValidID = validation.validateNumber(req.params.id);
      if (!isValidID) {
        throw new ErrorHandler(400, 'Invalid ID provided!');
      }
      const isValidBody = validation.validateObjectTypes(
        req.body,
        validationRules,
        false
      );
      if (!isValidBody) {
        throw new ErrorHandler(400, 'Invalid request body!');
      }
      await new GameModel().updateByID(req.params.id, req.body);
      return res.status(200).json({ message: 'Success!' });
    } catch (error) {
      next(error);
    }
  },
};
