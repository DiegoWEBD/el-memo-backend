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
exports.MysqlPromotionRepository = void 0;
const promotion_adapter_1 = require("./promotion.adapter");
class MysqlPromotionRepository {
    constructor(database) {
        this.database = database;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'select p.code, i.description, i.price ' +
                'from promotion p inner join item i ' +
                'on p.code = i.code;';
            const { data } = yield this.database.query(query);
            const promotions = data.map(promotion_adapter_1.adaptPromotion);
            for (const promo of promotions) {
                query =
                    'select pp.product_code, pp.product_quantity as quantity ' +
                        'from promotion_product pp ' +
                        'inner join promotion p ' +
                        'on pp.promotion_code = p.code ' +
                        `where p.code = "${promo.code}";`;
                const { data } = yield this.database.query(query);
                promo.products = data.map(promotion_adapter_1.adaptPromotionProduct);
            }
            return promotions;
        });
    }
    add(promotion) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionQueries = [];
            let query = `insert into promotion(code) values ("${promotion.code}");`;
            transactionQueries.push(query);
            for (const promotionProduct of promotion.products) {
                query =
                    'insert into promotion_product (promotion_code, product_code, product_quantity) ' +
                        `values ("${promotion.code}", "${promotionProduct.productCode}", ${promotionProduct.quantity});`;
                transactionQueries.push(query);
            }
            yield this.database.executeTransaction(transactionQueries);
        });
    }
    update(promotionCode, newValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionQueries = [];
            let query = `delete from promotion_product where promotion_code = "${promotionCode}";`;
            transactionQueries.push(query);
            for (const promotionProduct of newValues.products) {
                query =
                    'insert into promotion_product (promotion_code, product_code, product_quantity) ' +
                        `values ("${promotionCode}", "${promotionProduct.productCode}", ${promotionProduct.quantity});`;
                transactionQueries.push(query);
            }
            yield this.database.executeTransaction(transactionQueries);
        });
    }
    findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'select p.code, i.description, i.price ' +
                'from promotion p inner join item i ' +
                'on p.code = i.code ' +
                `where p.code = "${code}";`;
            let { data } = yield this.database.query(query);
            const item = data[0];
            if (item === undefined)
                return null;
            const promotion = (0, promotion_adapter_1.adaptPromotion)(item);
            query =
                'select pp.product_code, pp.product_quantity as quantity ' +
                    'from promotion_product pp ' +
                    'inner join promotion p ' +
                    'on pp.promotion_code = p.code ' +
                    `where p.code = "${code}";`;
            const response = yield this.database.query(query);
            data = response.data;
            promotion.products = data.map(promotion_adapter_1.adaptPromotionProduct);
            return promotion;
        });
    }
    remove(promotionCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `delete from promotion where code = "${promotionCode}"`;
            yield this.database.query(query);
        });
    }
}
exports.MysqlPromotionRepository = MysqlPromotionRepository;
