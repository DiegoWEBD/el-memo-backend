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
exports.makeDeletePromotion = void 0;
const errors_1 = require("../../errors");
const makeDeletePromotion = (promotionRepository) => {
    return (promotionCode) => __awaiter(void 0, void 0, void 0, function* () {
        const promotion = yield promotionRepository.findByCode(promotionCode);
        if (promotion == null) {
            throw new errors_1.CustomError(404, `La promoción ${promotionCode} no está registrada`);
        }
        yield promotionRepository.remove(promotionCode);
    });
};
exports.makeDeletePromotion = makeDeletePromotion;
