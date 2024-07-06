"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHttpResponse = void 0;
const makeHttpResponse = (statusCode, data) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    return { headers, statusCode, data: JSON.stringify(data) };
};
exports.makeHttpResponse = makeHttpResponse;
