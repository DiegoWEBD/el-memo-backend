"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const item_1 = require("../item");
class Product extends item_1.Item {
    constructor(code, description, price, buyPrice, stock) {
        super(code, description, price);
        this.buyPrice = buyPrice;
        this.stock = stock;
    }
}
exports.Product = Product;
