const CommonRoutes = require("../common");
const { ErrorHandler } = require("../../middleware/error");
const { userGames, user } = require("../../database");
const validation = require("../../validation");
const { generateHashedPassword } = require("../../middleware/auth");

class User extends CommonRoutes {
    constructor(...args) {
        super(...args);
    }

    getGamesByUserID = async (req, res, next) => {
        try {
            const isValidID = validation.validateNumber(req.params.id);

            if (!isValidID) {
                throw new ErrorHandler(400, "Invalid ID provided!");
            }

            const result = await userGames.getGamesByUserID(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            const isValidBody = validation.validateObjectTypes(req.body, this.state.validationRules, true);

            if (!isValidBody) {
                throw new ErrorHandler(400, "Invalid request body!");
            }

            const { password } = req.body;
            const hashedPassword = await generateHashedPassword(password);

            await user.create({...req.body, password: hashedPassword });
            return res.status(200).json({ message: "Success!" });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = User;