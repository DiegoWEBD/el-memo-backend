"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRouters = void 0;
const product_1 = require("../product");
const promotion_1 = require("../promotion");
const sale_1 = require("../sale");
const client_1 = require("../client");
const credit_1 = require("../credit");
const loadRouters = (api, portfolioApp) => {
    api.get('/', (_, res) => res.send('Api OK!'));
    api.use('/products', (0, product_1.createProductRouter)(portfolioApp));
    api.use('/promotions', (0, promotion_1.createPromotionRouter)(portfolioApp));
    api.use('/sales', (0, sale_1.createSaleRouter)(portfolioApp));
    api.use('/clients', (0, client_1.createClientRouter)(portfolioApp));
    api.use('/credits', (0, credit_1.createCreditRouter)(portfolioApp));
    // api.use('/employees', createEmployeeRouter(portfolioApp))
};
exports.loadRouters = loadRouters;
