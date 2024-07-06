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
exports.MysqlSaleRepository = void 0;
const sale_adapter_1 = require("./sale.adapter");
const utils_1 = require("../../utils");
class MysqlSaleRepository {
    constructor(database) {
        this.database = database;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'call get_sales();';
            const { data } = yield this.database.call('get_sales()');
            const sales = [];
            for (const row of data) {
                const sale = (0, sale_adapter_1.adaptSale)(row);
                query =
                    'select sold_item_code as code, ' +
                        'item_description as description, ' +
                        'item_price as price, quantity ' +
                        'from sale_detail ' +
                        `where sale_code = "${sale.code}";`;
                let response = yield this.database.query(query);
                sale.soldItems = response.data.map(sale_adapter_1.adaptSoldItem);
                query =
                    'select discount_type as type, percentage ' +
                        'from sale_discount ' +
                        `where sale_code = "${sale.code}";`;
                response = yield this.database.query(query);
                sale.discounts = response.data.map(sale_adapter_1.adaptSaleDiscount);
                sales.push(sale);
            }
            return sales;
        });
    }
    add(sale) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionQueries = [];
            if (sale.code === '')
                sale.code = yield this.generateCode();
            const byCredit = sale.byCredit ? 'true' : 'false';
            const withIva = sale.withIva ? 'true' : 'false';
            const voucherCode = sale.voucherCode === null ? 'null' : `"${sale.voucherCode}"`;
            const saleDate = (0, utils_1.fromDateToMysqlStringDate)(sale.saleDate);
            const clientId = sale.clientId !== null ? sale.clientId : 'null';
            let query = 'insert into sale (code, by_credit, with_iva, sale_date, voucher_code, client_id) ' +
                `values ("${sale.code}", ${byCredit}, ${withIva}, "${saleDate}", ${voucherCode}, ${clientId});`;
            transactionQueries.push(query);
            for (const item of sale.soldItems) {
                query =
                    'insert into sale_detail (sale_code, sold_item_code, quantity) ' +
                        `values ("${sale.code}", "${item.code}", ${item.quantity});`;
                transactionQueries.push(query);
            }
            for (const discount of sale.discounts) {
                query =
                    'insert into sale_discount (sale_code, discount_type, percentage) ' +
                        `values ("${sale.code}", "${discount.type}", ${discount.percentage});`;
                transactionQueries.push(query);
            }
            yield this.database.executeTransaction(transactionQueries);
            return (yield this.findByCode(sale.code));
        });
    }
    findByCode(saleCode) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `call get_sale("${saleCode}");`;
            let response = yield this.database.call(`get_sale("${saleCode}")`);
            if (response.data.length === 0)
                return null;
            const sale = (0, sale_adapter_1.adaptSale)(response.data[0]);
            query =
                'select sold_item_code as code, ' +
                    'item_description as description, ' +
                    'item_price as price, quantity ' +
                    'from sale_detail ' +
                    `where sale_code = "${saleCode}";`;
            response = yield this.database.query(query);
            sale.soldItems = response.data.map(sale_adapter_1.adaptSoldItem);
            query =
                'select discount_type as type, percentage ' +
                    'from sale_discount ' +
                    `where sale_code = "${sale.code}";`;
            response = yield this.database.query(query);
            sale.discounts = response.data.map(sale_adapter_1.adaptSaleDiscount);
            return sale;
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
exports.MysqlSaleRepository = MysqlSaleRepository;
