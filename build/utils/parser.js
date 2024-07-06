"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInteger = void 0;
const errors_1 = require("../errors");
const parseInteger = (num, key) => {
    if (num == null)
        throw new errors_1.CustomError(400, `${key} requerido`);
    if (typeof num === 'number')
        return num;
    const parsed = parseInt(num);
    if (isNaN(parsed))
        throw new errors_1.CustomError(400, `${key} inválido, debe ser un número`);
    if (parsed.toString().length !== num.toString().length)
        throw new errors_1.CustomError(400, `${key} inválido, debe ser un número`);
    return parsed;
};
exports.parseInteger = parseInteger;
