"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductRouter = void 0;
const express_1 = require("express");
const api_1 = require("../../api");
const product_requestHandler_1 = require("./product.requestHandler");
const createProductRouter = (posSystemApp) => {
    const router = (0, express_1.Router)();
    const requestHandler = (0, product_requestHandler_1.createProductRequestHandler)(posSystemApp.productServices);
    const productController = (0, api_1.createController)(requestHandler);
    router.all('/', productController);
    router.all('/:code', productController);
    return router;
};
exports.createProductRouter = createProductRouter;
