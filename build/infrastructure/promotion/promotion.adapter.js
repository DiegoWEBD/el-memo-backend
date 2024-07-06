"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptPromotionProduct = exports.adaptPromotion = void 0;
const domain_1 = require("../../domain");
const adaptPromotion = (promotion) => new domain_1.Promotion(promotion.code, promotion.description, promotion.price);
exports.adaptPromotion = adaptPromotion;
const adaptPromotionProduct = (promotionProduct) => ({
    productCode: promotionProduct.product_code,
    quantity: promotionProduct.quantity,
});
exports.adaptPromotionProduct = adaptPromotionProduct;
