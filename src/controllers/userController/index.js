const { userModel } = require('../../models');
const { ErrorHandler } = require('../../middleware/error');
const validation = require('../../validation');
const {
  generateHashedPassword,
  compareHashedPassword,
} = require('../../middleware/auth');

const validationRules = userModel.getColTypes();

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const result = await userModel.getAll();
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

      const result = await userModel.getByID(req.params.id);
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

      const { password } = req.body;
      const hashedPassword = await generateHashedPassword(password);

      await userModel.create({ ...req.body, password: hashedPassword });
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

      await userModel.updateByID(req.params.id, req.body);
      return res.status(200).json({ message: 'Success!' });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const isValidEmail = validation.validateEmail(req.body.email);

      if (!isValidEmail) {
        throw new ErrorHandler(400, 'Invalid email!');
      }

      const foundUser = await userModel.getByEmailNoPass(req.body.email);
      const foundPassword = await userModel.getPasswordByEmail(req.body.email);
      const isCorrectPassword = await compareHashedPassword(
        req.body.password,
        foundPassword.password
      );

      if (!isCorrectPassword) {
        throw new ErrorHandler(400, 'Invalid user!');
      }

      return res.status(200).json(foundUser);
    } catch (error) {
      next(error);
    }
  },
};
