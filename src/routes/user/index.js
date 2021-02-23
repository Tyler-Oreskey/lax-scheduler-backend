const CommonRoutes = require("../common");
const { userGames } = require("../../database");
const validation = require("../../validation");
const { ErrorHandler } = require("../../middleware/error");

class User extends CommonRoutes {
    constructor() {
        super("users", {
            first_name: String,
            last_name: String,
            email: String,
            is_email_verified: Boolean,
            receive_emails: Boolean
        });
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
}

module.exports = User;