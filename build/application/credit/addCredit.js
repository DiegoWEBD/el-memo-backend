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
exports.makeAddCredit = void 0;
const domain_1 = require("../../domain");
const errors_1 = require("../../errors");
const makeAddCredit = (creditRepository) => {
    return (saleCode, amount, paymentDate, voucherCode) => __awaiter(void 0, void 0, void 0, function* () {
        const newCredit = new domain_1.NewCredit(saleCode, amount, paymentDate, voucherCode);
        try {
            return yield creditRepository.addCredit(newCredit);
        }
        catch (error) {
            throw new errors_1.CustomError(400, error.message);
        }
    });
};
exports.makeAddCredit = makeAddCredit;
