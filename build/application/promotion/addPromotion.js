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
exports.makeAddPromotion = void 0;
const domain_1 = require("../../domain");
const errors_1 = require("../../errors");
const makeAddPromotion = (promotionRepository, itemRepository) => {
    return (code, description, price, products) => __awaiter(void 0, void 0, void 0, function* () {
        if (code === '')
            code = yield itemRepository.generateCode();
        else if ((yield itemRepository.findByCode(code)) !== null) {
            throw new errors_1.CustomError(409, `Ya existe un item con el código ${code}`);
        }
        const promotion = new domain_1.Promotion(code, description, price, products);
        const item = promotion;
        yield itemRepository.add(item);
        yield promotionRepository.add(promotion);
        return promotion;
    });
};
exports.makeAddPromotion = makeAddPromotion;
