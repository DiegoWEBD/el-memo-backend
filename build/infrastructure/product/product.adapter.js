"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptProduct = void 0;
const domain_1 = require("../../domain");
const adaptProduct = (product) => new domain_1.Product(product.code, product.description, product.price, product.buy_price, product.stock);
exports.adaptProduct = adaptProduct;
