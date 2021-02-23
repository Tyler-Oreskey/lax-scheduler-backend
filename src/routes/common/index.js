const { common } = require("../../database");
const validation = require("../../validation");
const { ErrorHandler } = require("../../middleware/error");

class CommonRoutes {
    constructor(tablename, validationRules) {
        this.state = {
            tablename: tablename,
            validationRules: validationRules
        }
    }

    getAll = async (req, res, next) => {
        try {
            const result = await common.getAll(this.state.tablename);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    getByID = async (req, res, next) => {
        try {
            const isValidID = validation.validateNumber(req.params.id);

            if (!isValidID) {
                throw new ErrorHandler(400, "Invalid ID provided!");
            }

            const result = await common.getByID(this.state.tablename, req.params.id);
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

            await common.create(this.state.tablename, req.body);
            return res.status(200).json({ message: "Success!" });
        } catch (error) {
            next(error);
        }
    };

    updateByID = async (req, res, next) => {
        try {
            const isValidID = validation.validateNumber(req.params.id);

            if (!isValidID) {
                throw new ErrorHandler(400, "Invalid ID provided!");
            }

            const isValidBody = validation.validateObjectTypes(req.body, this.state.validationRules, false);

            if (!isValidBody) {
                throw new ErrorHandler(400, "Invalid request body!");
            }

            await common.updateByID(this.state.tablename, req.params.id, req.body);
            return res.status(200).json({ message: "Success!" });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = CommonRoutes;