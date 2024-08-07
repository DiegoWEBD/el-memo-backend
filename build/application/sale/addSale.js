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
exports.makeAddSale = void 0;
const domain_1 = require("../../domain");
const errors_1 = require("../../errors");
const makeAddSale = (saleRepository, clientRepository) => {
    return (code, byCredit, withIva, date, voucherCode, clientId, items, discounts) => __awaiter(void 0, void 0, void 0, function* () {
        if (clientId !== null &&
            (yield clientRepository.findById(clientId)) === null) {
            throw new errors_1.CustomError(404, `El cliente ID:${clientId} no está registrado`);
        }
        const saleDiscounts = discounts !== null && discounts !== void 0 ? discounts : [];
        const newSale = new domain_1.Sale(code, 0, 0, 0, 0, date, clientId, null, byCredit, withIva, voucherCode, null, items, [], saleDiscounts);
        return yield saleRepository.add(newSale);
    });
};
exports.makeAddSale = makeAddSale;
