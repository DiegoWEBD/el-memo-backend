"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createController = void 0;
const utils_1 = require("../../utils");
const createController = (handler) => {
    return (req, res) => {
        handler(req)
            .then((response) => {
            res.set(response.headers)
                .status(response.statusCode)
                .send(response.data);
        })
            .catch((error) => {
            const httpError = (0, utils_1.makeHttpError)(error);
            res.status(httpError.statusCode).send({
                message: httpError.errorMessage,
            });
        });
    };
};
exports.createController = createController;
