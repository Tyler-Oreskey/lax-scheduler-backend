const queries = require("../../database/common");
const validation = require("../../validation");
const { ErrorHandler } = require("../../middleware/error");

class CommonRoutes {
    constructor(tablename, validationRules) {
        this.state = {
            id: 0,
            body: {},
            tablename: tablename,
            validationRules: validationRules,
            isValidID: false,
            isValidBody: false,
            lengthStrict: false,
            idErrorMessage: "Invalid ID provided!",
            requestBodyErrorMessage: "Invalid request body!",
            successMessage: "Success!",
            result: null
        }
    }

    getAll = async (req, res, next) => {
        try {
            this.state.result = await queries.getAll(this.state.tablename);
            return res.status(200).json(this.state.result);
        } catch (error) {
            next(error);
        }
    };

    getByID = async (req, res, next) => {
        try {
            this.state.id = req.params.id;
            this.state.isValidID = validation.validateNumber(this.state.id);

            if (!this.state.isValidID) {
                throw new ErrorHandler(400, this.state.idErrorMessage);
            }

            this.state.result = await queries.getByID(this.state.tablename, this.state.id);
            return res.status(200).json(this.state.result);
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            this.state.body = req.body;
            this.state.lengthStrict = true;
            this.state.isValidBody = validation
                .validateObjectTypes(this.state.body, this.state.validationRules, this.state.lengthStrict);

            if (!this.state.isValidBody) {
                throw new ErrorHandler(400, this.state.requestBodyErrorMessage);
            }

            await queries.create(this.state.tablename, this.state.body);
            return res.status(200).json({ message: this.state.successMessage });
        } catch (error) {
            next(error);
        }
    };

    updateByID = async (req, res, next) => {
        try {
            this.state.body = req.body;
            this.state.id = req.params.id;
            this.state.isValidID = validation.validateNumber(this.state.id);

            if (!this.state.isValidID) {
                throw new ErrorHandler(400, this.state.idErrorMessage);
            }

            this.state.isValidBody = validation
                .validateObjectTypes(this.state.body, this.state.validationRules, this.state.lengthStrict);

            if (!this.state.isValidBody) {
                throw new ErrorHandler(400, this.state.requestBodyErrorMessage);
            }

            await queries.updateByID(this.state.tablename, this.state.id, this.state.body);
            return res.status(200).json({ message: this.state.successMessage });
        } catch (error) {
            next(error);
        }
    };

    deleteByID = async (req, res, next) => {
        try {
            this.state.id = req.params.id;
            this.state.isValidID = validation.validateNumber(this.state.id);

            if (!this.state.isValidID) {
                throw new ErrorHandler(400, this.state.idErrorMessage);
            }

            await queries.deleteByID(this.state.tablename, this.state.id);
            return res.status(200).json({ message: this.state.successMessage });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = CommonRoutes;