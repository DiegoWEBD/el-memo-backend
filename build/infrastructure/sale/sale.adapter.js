"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptSaleToJSON = exports.adaptSale = exports.adaptSaleDiscount = exports.adaptSoldItem = void 0;
const domain_1 = require("../../domain");
const adaptSoldItem = (soldItem) => {
    var _a, _b;
    return ({
        code: soldItem.code,
        description: (_a = soldItem.description) !== null && _a !== void 0 ? _a : null,
        quantity: soldItem.quantity,
        price: (_b = soldItem.price) !== null && _b !== void 0 ? _b : null,
    });
};
exports.adaptSoldItem = adaptSoldItem;
const adaptSaleDiscount = (saleDiscount) => ({
    type: saleDiscount.type,
    percentage: parseFloat(saleDiscount.percentage),
});
exports.adaptSaleDiscount = adaptSaleDiscount;
const adaptSale = (sale) => new domain_1.Sale(sale.code, sale.subtotal, Number(sale.discount_applied), Number(sale.total), Number(sale.utility), sale.sale_date, sale.client_id, sale.client_name, sale.by_credit, sale.with_iva, sale.voucher_code, sale.completed);
exports.adaptSale = adaptSale;
const adaptSaleToJSON = (sale) => {
    var _a;
    return ({
        code: sale.code,
        subtotal: sale.subtotal,
        discount_applied: sale.discountApplied,
        total: sale.total,
        utility: sale.utility,
        sale_date: sale.saleDate,
        client_id: sale.clientId,
        client_name: sale.clientName,
        by_credit: Boolean(sale.byCredit),
        with_iva: Boolean(sale.withIva),
        voucher_code: sale.voucherCode,
        completed: (_a = Boolean(sale.completed)) !== null && _a !== void 0 ? _a : false,
        sold_items: sale.soldItems,
        discounts: sale.discounts,
        credits: sale.credits,
    });
};
exports.adaptSaleToJSON = adaptSaleToJSON;
