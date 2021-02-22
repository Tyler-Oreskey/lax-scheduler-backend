const queries = require("../../database/games");

const { ErrorHandler } = require("../../middleware/error");
const validation = require("../../validation");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const allGames = await queries.getAll();
            return res.status(200).json(allGames);
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

            const singleGame = await queries.getByID(id);
            return res.status(200).json(singleGame);
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const { body } = req;
            const isValidBody = validation.validateObjectTypes(body, {
                name: String,
                location: String,
                start_date: String,
                end_date: String
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
                name: String,
                location: String,
                start_date: String,
                end_date: String
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
};