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
exports.createProductRequestHandler = void 0;
const errors_1 = require("../../../errors");
const utils_1 = require("../../../utils");
const product_adapter_1 = require("../product.adapter");
const createProductRequestHandler = (productServices) => {
    return (request) => __awaiter(void 0, void 0, void 0, function* () {
        switch (request.method) {
            case 'GET': {
                const products = yield productServices.getProducts();
                return (0, utils_1.makeHttpResponse)(200, products);
            }
            case 'POST': {
                const newProduct = request.body;
                const product = yield productServices.addProduct(newProduct.code, newProduct.description, newProduct.price, newProduct.buy_price, newProduct.stock);
                return (0, utils_1.makeHttpResponse)(201, product);
            }
            case 'PUT': {
                const productCode = request.params.code;
                const newValues = (0, product_adapter_1.adaptProduct)(request.body);
                const updatedProduct = yield productServices.updateProduct(productCode, newValues);
                return (0, utils_1.makeHttpResponse)(200, { updatedProduct });
            }
            case 'DELETE': {
                const productCode = request.params.code;
                yield productServices.deleteProduct(productCode);
                return (0, utils_1.makeHttpResponse)(200, { message: 'Producto eliminado' });
            }
            default: {
                throw new errors_1.CustomError(405, `Método ${request.method} no permitido`);
            }
        }
    });
};
exports.createProductRequestHandler = createProductRequestHandler;
