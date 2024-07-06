"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditToJSON = exports.adaptCredit = void 0;
const domain_1 = require("../../domain");
const adaptCredit = (credit) => {
    var _a, _b;
    return new domain_1.Credit((_a = credit.id) !== null && _a !== void 0 ? _a : null, credit.sale_code, credit.amount, credit.payment_date, credit.voucher_code, (_b = credit.utility) !== null && _b !== void 0 ? _b : null);
};
exports.adaptCredit = adaptCredit;
const creditToJSON = (credit) => {
    var _a;
    return ({
        id: credit.id,
        sale_code: credit.saleCode,
        amount: credit.amount,
        payment_date: credit.paymentDate,
        voucher_code: credit.voucherCode,
        utility: (_a = credit.utility) !== null && _a !== void 0 ? _a : 0,
    });
};
exports.creditToJSON = creditToJSON;
