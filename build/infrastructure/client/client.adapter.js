"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptClient = void 0;
const domain_1 = require("../../domain");
const adaptClient = (client) => {
    var _a;
    return new domain_1.Client(client.id, client.name, client.special_discount, client.birth_date, client.registration_date, (_a = client.phones) !== null && _a !== void 0 ? _a : []);
};
exports.adaptClient = adaptClient;
