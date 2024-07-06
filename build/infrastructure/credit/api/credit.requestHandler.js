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
exports.createCreditRequestHandler = void 0;
const errors_1 = require("../../../errors");
const utils_1 = require("../../../utils");
const createCreditRequestHandler = (creditServices) => {
    return (request) => __awaiter(void 0, void 0, void 0, function* () {
        switch (request.method) {
            case 'GET': {
                const credits = yield creditServices.getCredits();
                return (0, utils_1.makeHttpResponse)(200, credits);
            }
            case 'POST': {
                const credit = request.body;
                const newCredit = yield creditServices.addCredit(credit.sale_code, credit.amount, new Date(credit.payment_date), credit.voucher_code);
                return (0, utils_1.makeHttpResponse)(201, newCredit);
            }
            default: {
                throw new errors_1.CustomError(405, `Método ${request.method} no permitido`);
            }
        }
    });
};
exports.createCreditRequestHandler = createCreditRequestHandler;
