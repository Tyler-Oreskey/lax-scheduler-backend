const { UserModel } = require('../../models');
const { ErrorHandler } = require('../../middleware/error');
const { JWT, Bcrypt } = require('../../middleware/auth');
const validation = require('../../validation');
const validationRules = new UserModel().getColTypes();

module.exports = {
  getByID: async (req, res, next) => {
    try {
      const isValidID = validation.validateNumber(req.params.id);

      if (!isValidID) {
        throw new ErrorHandler(400, 'Invalid ID provided!');
      }

      const result = await new UserModel().getByID(req.params.id);
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
      const isAlreadyUser = await new UserModel().getByEmailNoPass(
        req.body.email
      );
      if (isAlreadyUser) {
        throw new ErrorHandler(400, 'There is already a user by that email!');
      }
      const { password } = req.body;
      const hashedPassword = await new Bcrypt().generatePassword(password);
      await new UserModel().create({ ...req.body, password: hashedPassword });
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
      await new UserModel().updateByID(req.params.id, req.body);
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
      const foundUser = await new UserModel().getByEmailNoPass(req.body.email);
      if (!foundUser) {
        throw new ErrorHandler(400, 'User does not exist!');
      }
      const foundPassword = await new UserModel().getPasswordByEmail(
        req.body.email
      );
      const isCorrectPassword = await new Bcrypt().comparePassword(
        req.body.password,
        foundPassword.password
      );
      if (!isCorrectPassword) {
        throw new ErrorHandler(400, 'Invalid user!');
      }
      const jwtToken = new JWT().createToken(foundUser, {
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
