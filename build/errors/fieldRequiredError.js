"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldRequiredError = void 0;
const customError_1 = require("./customError");
class FieldRequiredError extends customError_1.CustomError {
    constructor(field) {
        super(400, `Campo "${field}" requerido`);
        Object.setPrototypeOf(this, FieldRequiredError.prototype);
    }
}
exports.FieldRequiredError = FieldRequiredError;
