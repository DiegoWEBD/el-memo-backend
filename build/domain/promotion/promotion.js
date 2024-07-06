"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promotion = void 0;
const item_1 = require("../item");
class Promotion extends item_1.Item {
    constructor(code, description, price, products = []) {
        super(code, description, price);
        this.products = products;
    }
}
exports.Promotion = Promotion;
