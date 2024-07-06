"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientRouter = void 0;
const express_1 = require("express");
const api_1 = require("../../api");
const client_requestHandler_1 = require("./client.requestHandler");
const createClientRouter = (posSystemApp) => {
    const router = (0, express_1.Router)();
    const requestHandler = (0, client_requestHandler_1.createClientRequestHandler)(posSystemApp.clientServices);
    const clientController = (0, api_1.createController)(requestHandler);
    router.all('/', clientController);
    router.all('/:code', clientController);
    return router;
};
exports.createClientRouter = createClientRouter;
