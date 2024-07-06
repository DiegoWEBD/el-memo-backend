"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseNotConnectedError = void 0;
const customError_1 = require("./customError");
class DatabaseNotConnectedError extends customError_1.CustomError {
    constructor() {
        super(500, 'Database connection is closed.');
    }
}
exports.DatabaseNotConnectedError = DatabaseNotConnectedError;
