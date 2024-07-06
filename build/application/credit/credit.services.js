"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreditServices = void 0;
const addCredit_1 = require("./addCredit");
const getCredits_1 = require("./getCredits");
const makeCreditServices = (creditRepository) => Object.freeze({
    getCredits: (0, getCredits_1.makeGetCredits)(creditRepository),
    addCredit: (0, addCredit_1.makeAddCredit)(creditRepository),
});
exports.makeCreditServices = makeCreditServices;
