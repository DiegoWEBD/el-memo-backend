"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCreditRouter = void 0;
const express_1 = require("express");
const credit_requestHandler_1 = require("./credit.requestHandler");
const api_1 = require("../../api");
const createCreditRouter = (posSystemApplication) => {
    const router = (0, express_1.Router)();
    const requestHandler = (0, credit_requestHandler_1.createCreditRequestHandler)(posSystemApplication.creditServices);
    const creditController = (0, api_1.createController)(requestHandler);
    router.all('/', creditController);
    return router;
};
exports.createCreditRouter = createCreditRouter;
