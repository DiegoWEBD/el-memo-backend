"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPromotionRouter = void 0;
const express_1 = require("express");
const api_1 = require("../../api");
const promotion_requestHandler_1 = require("./promotion.requestHandler");
const createPromotionRouter = (posSystemApp) => {
    const router = (0, express_1.Router)();
    const requestHandler = (0, promotion_requestHandler_1.createPromotionRequestHandler)(posSystemApp.promotionServices);
    const promotionController = (0, api_1.createController)(requestHandler);
    router.all('/', promotionController);
    router.all('/:code', promotionController);
    return router;
};
exports.createPromotionRouter = createPromotionRouter;
