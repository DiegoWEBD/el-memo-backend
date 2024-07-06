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
exports.MysqlCreditRepository = void 0;
const credit_adapter_1 = require("./credit.adapter");
const utils_1 = require("../../utils");
class MysqlCreditRepository {
    constructor(database) {
        this.database = database;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.database.call('get_all_credits()');
            return data.map(credit_adapter_1.adaptCredit);
        });
    }
    addCredit(newCredit) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const voucherCode = (_a = newCredit.voucherCode) !== null && _a !== void 0 ? _a : 'null';
            const paymentDate = (0, utils_1.fromDateToMysqlStringDate)(newCredit.paymentDate);
            const query = 'insert into credit (sale_code, amount, payment_date, voucher_code) ' +
                `values ("${newCredit.saleCode}", ${newCredit.amount}, "${paymentDate}", ${voucherCode});`;
            yield this.database.query(query);
            const saleCredits = yield this.getCreditsOfSale(newCredit.saleCode);
            return saleCredits[saleCredits.length - 1];
        });
    }
    getCreditsOfSale(saleCode) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(saleCode);
            // const { data } = await this.database.call(`get_sale_credits("${saleCode}")`)
            return [];
        });
    }
}
exports.MysqlCreditRepository = MysqlCreditRepository;
