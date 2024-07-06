"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDate = exports.validateDate = exports.fromDateToMysqlStringDate = void 0;
const errors_1 = require("../errors");
/* Receives a date object and returns a string that represents
   the given date with the format YYYY-MM-DD HH:mm:ss, which
   is the correct format to insert a date into a mysql database. */
const fromDateToMysqlStringDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
exports.fromDateToMysqlStringDate = fromDateToMysqlStringDate;
const validateDate = (date) => {
    const parts = date.split('/');
    if (parts.length !== 3) {
        throw new errors_1.CustomError(400, 'Fecha inválida');
    }
    const [day, month, year] = parts;
    const stringNormalized = `${year}/${month}/${day}`;
    if (isNaN(Date.parse(stringNormalized))) {
        throw new errors_1.CustomError(400, 'Fecha inválida');
    }
};
exports.validateDate = validateDate;
/* Receives a string date with format dd/mm/yyyy already validated
   and returns a date object */
const makeDate = (date) => {
    const [day, month, year] = date.split('/');
    return new Date(`${year}/${month}/${day}`);
};
exports.makeDate = makeDate;
