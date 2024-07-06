"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeProductServices = void 0;
const addProduct_1 = require("./addProduct");
const deleteProduct_1 = require("./deleteProduct");
const getProducts_1 = require("./getProducts");
const updateProduct_1 = require("./updateProduct");
const makeProductServices = (productRepository, itemRepository) => {
    return Object.freeze({
        getProducts: (0, getProducts_1.makeGetProducts)(productRepository),
        addProduct: (0, addProduct_1.makeAddProduct)(productRepository, itemRepository),
        updateProduct: (0, updateProduct_1.makeUpdateProduct)(productRepository, itemRepository),
        deleteProduct: (0, deleteProduct_1.makeDeleteProduct)(productRepository),
    });
};
exports.makeProductServices = makeProductServices;
