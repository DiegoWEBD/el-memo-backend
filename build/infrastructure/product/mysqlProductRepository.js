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
exports.MysqlProductRepository = void 0;
const product_adapter_1 = require("./product.adapter");
class MysqlProductRepository {
    constructor(database) {
        this.database = database;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'select i.code, i.description, p.buy_price, ' +
                'i.price, p.stock ' +
                'from product p inner join item i ' +
                'on p.code = i.code;';
            const { data } = yield this.database.query(query);
            return data.map(product_adapter_1.adaptProduct);
        });
    }
    add(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'insert into product(code, buy_price, stock) ' +
                `values ("${product.code}", ${product.buyPrice}, ${product.stock});`;
            yield this.database.query(query);
        });
    }
    findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'select i.code, i.description, p.buy_price, ' +
                'i.price, p.stock ' +
                'from product p inner join item i ' +
                'on p.code = i.code ' +
                `where p.code = "${code}";`;
            const { data } = yield this.database.query(query);
            const product = data[0];
            return product === undefined ? null : (0, product_adapter_1.adaptProduct)(product);
        });
    }
    update(productCode, newValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'update product set ' +
                `buy_price = "${newValues.buyPrice}", ` +
                `stock = "${newValues.stock}" ` +
                `where code = "${productCode}";`;
            yield this.database.query(query);
        });
    }
    remove(productCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `delete from product where code = "${productCode}"`;
            yield this.database.query(query);
        });
    }
}
exports.MysqlProductRepository = MysqlProductRepository;
