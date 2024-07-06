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
exports.makeGetSaleData = void 0;
const errors_1 = require("../../errors");
const infrastructure_1 = require("../../infrastructure");
const makeGetSaleData = (saleRepository, creditRepository) => {
    return (saleCode) => __awaiter(void 0, void 0, void 0, function* () {
        const sale = yield saleRepository.findByCode(saleCode);
        if (sale === null)
            throw new errors_1.CustomError(404, `La venta ${saleCode} no está registrada.`);
        const saleCredits = yield creditRepository.getCreditsOfSale(sale.code);
        sale.credits = saleCredits.map(infrastructure_1.adaptCredit);
        return sale;
    });
};
exports.makeGetSaleData = makeGetSaleData;
