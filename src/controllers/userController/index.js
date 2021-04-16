const { UserModel, CommonModel } = require('../../models');
const { ErrorHandler } = require('../../middleware/error');
const { JWT, Bcrypt } = require('../../middleware/auth');
const validation = require('../../validation');
const validationRules = new UserModel().getColTypes();

module.exports = {
  // Get a single user.
  getByID: async (req, res, next) => {
    try {
      const isValidID = validation.validateNumber(req.params.id);
      if (!isValidID) {
        throw new ErrorHandler(400, 'Invalid request!');
      }
      const tableName = new UserModel().getTablename();
      const queryData = {
        columns: ['id', 'first_name', 'last_name', 'email'],
        whereClause: { id: req.params.id },
      };
      const [result] = await new CommonModel().get(tableName, queryData);
      if (!result) {
        throw new ErrorHandler(400, 'An error occured!');
      }
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  // Create new user at signup.
  create: async (req, res, next) => {
    try {
      const isValidBody = validation.validateObjectTypes(
        req.body,
        validationRules,
        true
      );
      if (!isValidBody) {
        throw new ErrorHandler(400, 'Invalid request!');
      }
      const tableName = new UserModel().getTablename();
      let queryData = {
        columns: ['*'],
        whereClause: { email: req.body.email },
      };
      const [foundUser] = await new CommonModel().get(tableName, queryData);
      if (foundUser) {
        throw new ErrorHandler(400, 'An error occured!');
      }
      const { password } = req.body;
      const hashedPassword = await new Bcrypt().generatePassword(password);
      queryData = {
        body: {
          ...req.body,
          password: hashedPassword,
        },
      };
      await new CommonModel().create(tableName, queryData);
      return res.status(200).json({ message: 'Success!' });
    } catch (error) {
      next(error);
    }
  },
  // Update user info NOT including password.
  updateByID: async (req, res, next) => {
    try {
      const isValidID = validation.validateNumber(req.params.id);
      if (!isValidID) {
        throw new ErrorHandler(400, 'Invalid request!');
      }
      const isValidBody = validation.validateObjectTypes(
        req.body,
        validationRules,
        false
      );
      if (!isValidBody) {
        throw new ErrorHandler(400, 'Invalid request!');
      }
      const tableName = new UserModel().getTablename();
      const queryData = { whereClause: { id: req.params.id }, body: req.body };
      await new CommonModel().update(tableName, queryData);
      return res.status(200).json({ message: 'Success!' });
    } catch (error) {
      next(error);
    }
  },
  // check if user exists and if the provided password matches password in database.
  login: async (req, res, next) => {
    try {
      const isValidEmail = validation.validateEmail(req.body.email);
      if (!isValidEmail) {
        throw new ErrorHandler(400, 'Invalid request!');
      }
      const tableName = new UserModel().getTablename();
      let queryData = {
        columns: [
          'id',
          'first_name',
          'last_name',
          'email',
          'is_email_verified',
        ],
        whereClause: { email: req.body.email },
      };
      const [foundUser] = await new CommonModel().get(tableName, queryData);
      if (!foundUser) {
        throw new ErrorHandler(400, 'An error occured!');
      }
      queryData = {
        columns: ['password'],
        whereClause: { email: req.body.email },
      };
      const [foundPassword] = await new CommonModel().get(tableName, queryData);
      const isCorrectPassword = await new Bcrypt().comparePassword(
        req.body.password,
        foundPassword.password
      );
      if (!isCorrectPassword) {
        throw new ErrorHandler(400, 'Invalid request!');
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
