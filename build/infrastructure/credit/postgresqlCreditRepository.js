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
exports.PostgresqlCreditRepository = void 0;
const credit_adapter_1 = require("./credit.adapter");
class PostgresqlCreditRepository {
    constructor(database) {
        this.database = database;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.database.query('select * from get_all_credits();');
            return data.map(credit_adapter_1.adaptCredit);
        });
    }
    addCredit(newCredit) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(newCredit);
            throw new Error('Method not implemented.');
        });
    }
    getCreditsOfSale(saleCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.database.query(`select * from get_sale_credits('${saleCode}');`);
            return data.map(credit_adapter_1.adaptCredit);
        });
    }
}
exports.PostgresqlCreditRepository = PostgresqlCreditRepository;
