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
exports.makeAddClient = void 0;
const domain_1 = require("../../domain");
const makeAddClient = (clientRepository) => {
    return (name, specialDiscount, birthDate, registrationDate, phones) => __awaiter(void 0, void 0, void 0, function* () {
        const client = new domain_1.Client(null, name, specialDiscount, birthDate, registrationDate, phones);
        return yield clientRepository.add(client);
    });
};
exports.makeAddClient = makeAddClient;
