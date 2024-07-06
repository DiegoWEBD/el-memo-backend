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
exports.PostgresqlSaleRepository = void 0;
const utils_1 = require("../../utils");
const sale_adapter_1 = require("./sale.adapter");
class PostgresqlSaleRepository {
    constructor(database) {
        this.database = database;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'select * from get_sales();';
            const { data } = yield this.database.query(query);
            const sales = data.map(sale_adapter_1.adaptSale);
            return sales;
        });
    }
    add(sale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sale.code === '')
                sale.code = yield this.generateCode();
            const byCredit = sale.byCredit ? 'true' : 'false';
            const withIva = sale.withIva ? 'true' : 'false';
            const voucherCode = sale.voucherCode === null ? 'null' : `"${sale.voucherCode}"`;
            const saleDate = (0, utils_1.fromDateToMysqlStringDate)(sale.saleDate);
            const clientId = sale.clientId !== null ? sale.clientId : 'null';
            const queries = [];
            let query = 'insert into sale (code, by_credit, with_iva, sale_date, voucher_code, client_id) ' +
                `values ('${sale.code}', ${byCredit}, ${withIva}, '${saleDate}', ${voucherCode}, ${clientId});`;
            queries.push(query);
            for (const item of sale.soldItems) {
                query =
                    'insert into sale_detail (sale_code, sold_item_code, quantity) ' +
                        `values ('${sale.code}', '${item.code}', ${item.quantity});`;
                queries.push(query);
            }
            yield this.database.executeTransaction(queries);
            return (yield this.findByCode(sale.code));
        });
    }
    findByCode(saleCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select * from get_sale('${saleCode}');`;
            const { data } = yield this.database.query(query);
            return data.length === 0 ? null : (0, sale_adapter_1.adaptSale)(data[0]);
        });
    }
    generateCode() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.database.query('select s.code from sale s;');
            const codes = data.map((item) => parseInt(item.code));
            return codes.length !== 0 ? `${Math.max(...codes) + 1}` : '1001';
        });
    }
}
exports.PostgresqlSaleRepository = PostgresqlSaleRepository;
