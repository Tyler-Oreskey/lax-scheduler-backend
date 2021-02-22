const queries = require("../../database/games");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const allGames = await queries.getAll();
            return res.status(200).json(allGames);
        } catch (error) {
        }
    },
    getByID: async (req, res, next) => {
        try {
            const { id } = req.params;
            const singleGame = await queries.getByID(id);
            return res.status(200).json(singleGame);
        } catch (error) {
        }
    },
    create: async (req, res, next) => {
        try {
            const { body } = req;
            await queries.create(body);
            return res.status(200).json({ message: "Success!" });
        } catch (error) {
        }
    },
    updateByID: async (req, res, next) => {
        try {
            const { body, params: { id } } = req;
            await queries.updateByID(id, body)
            return res.status(200).json({ message: "Success!" });
        } catch (error) {
        }
    },
    deleteByID: async (req, res, next) => {
        try {
            const { id } = req.params;
            await queries.deleteByID(id);
            return res.status(200).json({ message: "Success!" });
        } catch (error) {
        }
    }
};