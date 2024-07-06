"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const client_1 = require("./client");
const credit_1 = require("./credit");
const product_1 = require("./product");
const promotion_1 = require("./promotion");
const sale_1 = require("./sale");
class Application {
    constructor(dependencies) {
        this.productServices = (0, product_1.makeProductServices)(dependencies.productRepository, dependencies.itemRepository);
        this.promotionServices = (0, promotion_1.makePromotionServices)(dependencies.promotionRepository, dependencies.itemRepository);
        this.saleServices = (0, sale_1.makeSaleServices)(dependencies.saleRepository, dependencies.clientRepository, dependencies.creditRepository);
        this.clientServices = (0, client_1.makeClientServices)(dependencies.clientRepository);
        this.creditServices = (0, credit_1.makeCreditServices)(dependencies.creditRepository);
    }
}
exports.Application = Application;
