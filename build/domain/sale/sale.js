"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
class Sale {
    constructor(code, subtotal, discountApplied, total, utility, saleDate, clientId, clientName, byCredit, withIva, voucherCode, completed, soldItems = [], credits = [], discounts = []) {
        this.code = code;
        this.subtotal = subtotal;
        this.discountApplied = discountApplied;
        this.total = total;
        this.utility = utility;
        this.saleDate = saleDate;
        this.clientId = clientId;
        this.clientName = clientName;
        this.byCredit = byCredit;
        this.withIva = withIva;
        this.voucherCode = voucherCode;
        this.soldItems = soldItems;
        this.completed = completed;
        this.credits = credits;
        this.discounts = discounts;
    }
}
exports.Sale = Sale;
