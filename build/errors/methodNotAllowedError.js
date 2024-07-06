"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodNotAllowedError = void 0;
const customError_1 = require("./customError");
class MethodNotAllowedError extends customError_1.CustomError {
    constructor(method) {
        super(405, `Método ${method} no permitido`);
        Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
    }
}
exports.MethodNotAllowedError = MethodNotAllowedError;
