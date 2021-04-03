const { GameModel, CommonModel } = require('../../models');
const { ErrorHandler } = require('../../middleware/error');
const validation = require('../../validation');
const validationRules = new GameModel().getColTypes();

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const tableName = new GameModel().getTablename();
      const queryData = { columns: ['*'] };
      const result = await new CommonModel().get(tableName, queryData);
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
      const tableName = new GameModel().getTablename();
      const queryData = { columns: ['*'], whereClause: { id: req.params.id } };
      const result = await new CommonModel().get(tableName, queryData);
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
      const tableName = new GameModel().getTablename();
      const queryData = { body: req.body };
      await new CommonModel().create(tableName, queryData);
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
      const tableName = new GameModel().getTablename();
      const queryData = { whereClause: { id: req.params.id }, body: req.body };
      await new CommonModel().update(tableName, queryData);
      return res.status(200).json({ message: 'Success!' });
    } catch (error) {
      next(error);
    }
  },
};
