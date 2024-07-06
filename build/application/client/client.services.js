"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeClientServices = void 0;
const addClient_1 = require("./addClient");
const getClients_1 = require("./getClients");
const makeClientServices = (clientRepository) => {
    return Object.freeze({
        getClients: (0, getClients_1.makeGetClients)(clientRepository),
        addClient: (0, addClient_1.makeAddClient)(clientRepository),
    });
};
exports.makeClientServices = makeClientServices;
