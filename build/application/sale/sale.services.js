"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSaleServices = void 0;
const addSale_1 = require("./addSale");
const getSaleData_1 = require("./getSaleData");
const getSales_1 = require("./getSales");
const makeSaleServices = (saleRepository, clientRepository, creditRepository) => {
    return Object.freeze({
        getSales: (0, getSales_1.makeGetSales)(saleRepository, creditRepository),
        getSaleData: (0, getSaleData_1.makeGetSaleData)(saleRepository, creditRepository),
        addSale: (0, addSale_1.makeAddSale)(saleRepository, clientRepository),
    });
};
exports.makeSaleServices = makeSaleServices;
