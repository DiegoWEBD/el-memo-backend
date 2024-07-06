"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createController = void 0;
exports.createApi = createApi;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
Object.defineProperty(exports, "createController", { enumerable: true, get: function () { return controller_1.createController; } });
const routersLoader_1 = require("./routersLoader");
function createApi(posSystemApp) {
    const api = (0, express_1.default)();
    api.use((0, cors_1.default)());
    api.use(express_1.default.json());
    (0, routersLoader_1.loadRouters)(api, posSystemApp);
    const start = (port) => {
        api.listen(port, () => {
            console.log(`Api listening on port ${port}`);
        });
    };
    return Object.freeze({ start });
}
