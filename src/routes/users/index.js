const queries = require("../../database/users");
const { ErrorHandler } = require("../../middleware/error");
const validation = require("../../validation");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const allUsers = await queries.getAll();
            return res.status(200).json(allUsers);
        } catch (error) {
            next(error);
        }
    },
    getByID: async (req, res, next) => {
        try {
            const { id } = req.params;
            const isValidID = validation.validateNumber(id);

            if (!isValidID) {
                throw new ErrorHandler(400, "Invalid ID provided!");
            }

            const singleUser = await queries.getByID(id);
            return res.status(200).json(singleUser);
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const { body } = req;
            const isValidBody = validation.validateObjectTypes(body, {
                first_name: String,
                last_name: String,
                email: String,
                is_email_verified: Boolean,
                receive_emails: Boolean
            }, lengthStrict = true);

            if (!isValidBody) {
                throw new ErrorHandler(400, "Invalid request body!");
            }

            await queries.create(body);
            return res.status(200).json({ message: "Success!" });
        } catch (error) {
            next(error);
        }
    },
    updateByID: async (req, res, next) => {
        try {
            const { body, params: { id } } = req;
            const isValidID = validation.validateNumber(id);

            if (!isValidID) {
                throw new ErrorHandler(400, "Invalid ID provided!");
            }

            const isValidBody = validation.validateObjectTypes(body, {
                first_name: String,
                last_name: String,
                email: String,
                is_email_verified: Boolean,
                receive_emails: Boolean                
            });

            if (!isValidBody) {
                throw new ErrorHandler(400, "Invalid request body!");
            }

            await queries.updateByID(id, body)
            return res.status(200).json({ message: "Success!" });
        } catch (error) {
            next(error);
        }
    },
    deleteByID: async (req, res, next) => {
        try {
            const { id } = req.params;
            const isValidID = validation.validateNumber(id);

            if (!isValidID) {
                throw new ErrorHandler(400, "Invalid ID provided!");
            }

            await queries.deleteByID(id);
            return res.status(200).json({ message: "Success!" });
        } catch (error) {
            next(error);
        }
    }
}