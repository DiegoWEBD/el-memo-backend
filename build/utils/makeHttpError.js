"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHttpError = void 0;
const errors_1 = require("../errors");
const makeHttpError = (error) => {
    const httpError = {
        statusCode: 500,
        errorMessage: 'Internal server error',
    };
    if (error instanceof errors_1.CustomError) {
        httpError.statusCode = error.getCode();
        httpError.errorMessage = error.getMessage();
    }
    return httpError;
};
exports.makeHttpError = makeHttpError;
