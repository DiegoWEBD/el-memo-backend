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
exports.createSaleRequestHandler = void 0;
const utils_1 = require("../../../utils");
const sale_adapter_1 = require("../sale.adapter");
const errors_1 = require("../../../errors");
const createSaleRequestHandler = (saleServices) => {
    return (request) => __awaiter(void 0, void 0, void 0, function* () {
        switch (request.method) {
            case 'GET': {
                if (request.params.code !== undefined) {
                    const sale = yield saleServices.getSaleData(request.params.code);
                    return (0, utils_1.makeHttpResponse)(200, (0, sale_adapter_1.adaptSaleToJSON)(sale));
                }
                const sales = yield saleServices.getSales();
                return (0, utils_1.makeHttpResponse)(200, sales.map(sale_adapter_1.adaptSaleToJSON));
            }
            case 'POST': {
                const newSale = request.body;
                newSale.items = newSale.items.map(sale_adapter_1.adaptSoldItem);
                newSale.discounts =
                    newSale.discounts !== undefined
                        ? newSale.discounts.map(sale_adapter_1.adaptSaleDiscount)
                        : null;
                const sale = yield saleServices.addSale(newSale.code, newSale.by_credit, newSale.with_iva, new Date(newSale.date), newSale.voucher_code, newSale.client_id, newSale.items, newSale.discounts);
                return (0, utils_1.makeHttpResponse)(201, (0, sale_adapter_1.adaptSaleToJSON)(sale));
            }
            default: {
                throw new errors_1.CustomError(405, `Método ${request.method} no permitido`);
            }
        }
    });
};
exports.createSaleRequestHandler = createSaleRequestHandler;
