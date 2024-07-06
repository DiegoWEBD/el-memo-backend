"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePromotionServices = void 0;
const addPromotion_1 = require("./addPromotion");
const deletePromotion_1 = require("./deletePromotion");
const getPromotions_1 = require("./getPromotions");
const updatePromotion_1 = require("./updatePromotion");
const makePromotionServices = (promotionRepository, itemRepository) => {
    return Object.freeze({
        getPromotions: (0, getPromotions_1.makeGetPromotions)(promotionRepository),
        addPromotion: (0, addPromotion_1.makeAddPromotion)(promotionRepository, itemRepository),
        updatePromotion: (0, updatePromotion_1.makeUpdatePromotion)(promotionRepository, itemRepository),
        deletePromotion: (0, deletePromotion_1.makeDeletePromotion)(promotionRepository),
    });
};
exports.makePromotionServices = makePromotionServices;
