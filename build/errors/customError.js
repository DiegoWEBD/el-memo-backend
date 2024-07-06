"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(code, message) {
        super(message);
        this.getCode = () => this.code;
        this.getMessage = () => this.message;
        this.code = code;
        // Set the prototype explicitly
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
