"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTypeError = void 0;
const customError_1 = require("./customError");
class InvalidTypeError extends customError_1.CustomError {
    constructor(field, expectedType) {
        super(400, `Campo "${field}" inválido, debe ser un ${expectedType}`);
        Object.setPrototypeOf(this, InvalidTypeError.prototype);
    }
}
exports.InvalidTypeError = InvalidTypeError;
