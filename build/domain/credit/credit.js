"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credit = exports.NewCredit = void 0;
class NewCredit {
    constructor(saleCode, amount, paymentDate, voucherCode) {
        this.saleCode = saleCode;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.voucherCode = voucherCode;
    }
}
exports.NewCredit = NewCredit;
class Credit {
    constructor(id, saleCode, amount, paymentDate, voucherCode, utility = null) {
        this.id = id;
        this.saleCode = saleCode;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.voucherCode = voucherCode;
        this.utility = utility;
    }
}
exports.Credit = Credit;
