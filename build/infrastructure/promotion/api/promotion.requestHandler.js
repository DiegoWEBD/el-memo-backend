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
exports.createPromotionRequestHandler = void 0;
const errors_1 = require("../../../errors");
const utils_1 = require("../../../utils");
const promotion_adapter_1 = require("../promotion.adapter");
const createPromotionRequestHandler = (promotionServices) => {
    return (request) => __awaiter(void 0, void 0, void 0, function* () {
        switch (request.method) {
            case 'GET': {
                const promotions = yield promotionServices.getPromotions();
                return (0, utils_1.makeHttpResponse)(200, promotions);
            }
            case 'POST': {
                const newPromotion = request.body;
                const promotion = yield promotionServices.addPromotion(newPromotion.code, newPromotion.description, newPromotion.price, newPromotion.products);
                return (0, utils_1.makeHttpResponse)(201, promotion);
            }
            case 'PUT': {
                const promotionCode = request.params.code;
                const newValues = (0, promotion_adapter_1.adaptPromotion)(request.body);
                newValues.products = request.body.products.map(promotion_adapter_1.adaptPromotionProduct);
                const updatedPromotion = yield promotionServices.updatePromotion(promotionCode, newValues);
                return (0, utils_1.makeHttpResponse)(200, updatedPromotion);
            }
            case 'DELETE': {
                const promotionCode = request.params.code;
                yield promotionServices.deletePromotion(promotionCode);
                return (0, utils_1.makeHttpResponse)(200, {
                    message: `Promoción ${promotionCode} eliminada correctamente`,
                });
            }
            default: {
                throw new errors_1.CustomError(405, `Método ${request.method} no permitido`);
            }
        }
    });
};
exports.createPromotionRequestHandler = createPromotionRequestHandler;
