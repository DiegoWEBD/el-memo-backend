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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlDatabase = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const errors_1 = require("../../errors");
class MysqlDatabase {
    constructor() {
        this.isConnected = false;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Connecting to database...');
            try {
                const dbConnection = yield promise_1.default.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'Dgo951mz',
                    database: 'vallepesca-database',
                });
                this.connection = dbConnection;
                this.isConnected = true;
                console.log('Connected to database');
            }
            catch (_a) {
                throw new errors_1.CustomError(500, 'Unable to connect to database.');
            }
        });
    }
    query(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected)
                throw new errors_1.DatabaseNotConnectedError();
            let rows;
            try {
                ;
                [rows] = yield this.connection.query(query);
            }
            catch (error) {
                throw new errors_1.CustomError(400, error.message);
            }
            rows = rows;
            return { data: rows };
        });
    }
    call(procedureCall) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected)
                throw new errors_1.DatabaseNotConnectedError();
            let rows;
            try {
                ;
                [rows] = yield this.connection.query(`call ${procedureCall};`);
            }
            catch (error) {
                throw new errors_1.CustomError(400, error.message);
            }
            rows = rows;
            return { data: rows[0] };
        });
    }
    executeTransaction(queries) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.beginTransaction();
            for (const query of queries) {
                try {
                    yield this.query(query);
                }
                catch (error) {
                    yield this.connection.rollback();
                    throw new errors_1.CustomError(400, error.message);
                }
            }
            yield this.connection.commit();
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected)
                throw new errors_1.DatabaseNotConnectedError();
            yield this.connection.end();
            this.isConnected = false;
            console.log('Database disconnected.');
        });
    }
}
exports.MysqlDatabase = MysqlDatabase;
