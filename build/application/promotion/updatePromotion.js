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
exports.makeUpdatePromotion = void 0;
const errors_1 = require("../../errors");
const makeUpdatePromotion = (promotionRepository, itemRepository) => {
    return (promotionCode, newValues) => __awaiter(void 0, void 0, void 0, function* () {
        if ((yield promotionRepository.findByCode(promotionCode)) === null) {
            throw new errors_1.CustomError(404, `La promoción ${promotionCode} no está registrada`);
        }
        if (promotionCode !== newValues.code &&
            (yield itemRepository.findByCode(newValues.code)) !== null) {
            throw new errors_1.CustomError(409, `Ya existe un item con código ${newValues.code}`);
        }
        if (newValues.code === '') {
            newValues.code = yield itemRepository.generateCode();
        }
        const item = newValues;
        yield itemRepository.update(promotionCode, item);
        yield promotionRepository.update(item.code, newValues);
        return newValues;
    });
};
exports.makeUpdatePromotion = makeUpdatePromotion;
