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
exports.makeAddProduct = void 0;
const domain_1 = require("../../domain");
const errors_1 = require("../../errors");
const makeAddProduct = (productRepository, itemRepository) => {
    return (code, description, price, buyPrice, stock) => __awaiter(void 0, void 0, void 0, function* () {
        if (code === '')
            code = yield itemRepository.generateCode();
        else if ((yield itemRepository.findByCode(code)) != null) {
            throw new errors_1.CustomError(409, `Ya existe un item con el código ${code}`);
        }
        const product = new domain_1.Product(code, description, price, buyPrice, stock);
        const item = new domain_1.Item(code, description, price);
        yield itemRepository.add(item);
        yield productRepository.add(product);
        return product;
    });
};
exports.makeAddProduct = makeAddProduct;
