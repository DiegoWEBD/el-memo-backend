"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSaleRouter = void 0;
const express_1 = require("express");
const sale_requestHandler_1 = require("./sale.requestHandler");
const api_1 = require("../../api");
const createSaleRouter = (posSystemApp) => {
    const router = (0, express_1.Router)();
    const requestHandler = (0, sale_requestHandler_1.createSaleRequestHandler)(posSystemApp.saleServices);
    const saleController = (0, api_1.createController)(requestHandler);
    router.all('/', saleController);
    router.all('/:code', saleController);
    return router;
};
exports.createSaleRouter = createSaleRouter;
