"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientRequestHandler = void 0;
const utils_1 = require("../../../utils");
const errors_1 = require("../../../errors");
const createClientRequestHandler = (clientServices) => {
    return (request) => __awaiter(void 0, void 0, void 0, function* () {
        switch (request.method) {
            case 'GET': {
                const clients = yield clientServices.getClients();
                return (0, utils_1.makeHttpResponse)(200, clients);
            }
            case 'POST': {
                const newClient = request.body;
                const client = yield clientServices.addClient(newClient.name, newClient.special_discount, new Date(newClient.birth_date), new Date(newClient.registration_date), newClient.phones);
                return (0, utils_1.makeHttpResponse)(201, client);
            }
            default: {
                throw new errors_1.CustomError(405, `Método ${request.method} no permitido`);
            }
        }
    });
};
exports.createClientRequestHandler = createClientRequestHandler;
