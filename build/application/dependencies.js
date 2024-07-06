"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAppDependencies = void 0;
const infrastructure_1 = require("../infrastructure");
const postgresqlCreditRepository_1 = require("../infrastructure/credit/postgresqlCreditRepository");
const postgresqlSaleRepository_1 = require("../infrastructure/sale/postgresqlSaleRepository");
const loadAppDependencies = (database) => Object.freeze({
    productRepository: new infrastructure_1.MysqlProductRepository(database),
    promotionRepository: new infrastructure_1.MysqlPromotionRepository(database),
    itemRepository: new infrastructure_1.MysqlItemRepository(database),
    saleRepository: new postgresqlSaleRepository_1.PostgresqlSaleRepository(database),
    clientRepository: new infrastructure_1.MysqlClientRepository(database),
    creditRepository: new postgresqlCreditRepository_1.PostgresqlCreditRepository(database),
});
exports.loadAppDependencies = loadAppDependencies;
