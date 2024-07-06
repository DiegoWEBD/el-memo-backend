"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
const infrastructure_1 = require("./infrastructure");
const database_postgres_1 = require("./infrastructure/database/database.postgres");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3001');
const database = new database_postgres_1.PgDatabase();
database
    .connect()
    .then(() => {
    const appDependencies = (0, application_1.loadAppDependencies)(database);
    const portfolioApp = new application_1.Application(appDependencies);
    const api = (0, infrastructure_1.createApi)(portfolioApp);
    api.start(PORT);
})
    .catch((error) => {
    console.log(error.getMessage());
});
