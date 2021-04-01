const { userModel } = require('../../models');
const { ErrorHandler } = require('../../middleware/error');
const validation = require('../../validation');
const { JWT, Bcrypt } = require('../../middleware/auth');
const validationRules = userModel.getColTypes();

module.exports = {
  get: async (req, res, next) => {
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

      const isAlreadyUser = await userModel.getByEmailNoPass(req.body.email);

      if (isAlreadyUser) {
        throw new ErrorHandler(400, 'There is already a user by that email!');
      }

      const { password } = req.body;
      const hashedPassword = await new Bcrypt().generatePassword(password);
      await userModel.create({ ...req.body, password: hashedPassword });
      return res.status(200).json({ message: 'Success!' });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
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

      if (!foundUser) {
        throw new ErrorHandler(400, 'User does not exist!');
      }

      const foundPassword = await userModel.getPasswordByEmail(req.body.email);

      const isCorrectPassword = await new Bcrypt().comparePassword(
        req.body.password,
        foundPassword.password
      );

      if (!isCorrectPassword) {
        throw new ErrorHandler(400, 'Invalid user!');
      }

      const jwtToken = new JWT().createToken(foundUser, {
        expiresIn: '7d',
        subject: `${foundUser.id}`,
      });

      if (!jwtToken) {
        throw new ErrorHandler(400, 'An error occured!');
      }

      return res.status(200).json(jwtToken);
    } catch (error) {
      next(error);
    }
  },
};
