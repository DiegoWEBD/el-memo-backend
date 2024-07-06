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
exports.PgDatabase = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const errors_1 = require("../../errors");
const pgp = (0, pg_promise_1.default)();
class PgDatabase {
    constructor() {
        this.isConnected = false;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Connecting to database...');
            this.connection = pgp({
                host: 'localhost',
                port: 5432,
                database: 'vallepesca-db',
                user: 'postgres',
                password: 'Dgo951mz',
            });
            this.isConnected = true;
            console.log('Connected to database');
        });
    }
    query(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected)
                throw new errors_1.DatabaseNotConnectedError();
            let result;
            try {
                result = yield this.connection.any(query);
            }
            catch (error) {
                throw new errors_1.CustomError(400, error.message);
            }
            return { data: result };
        });
    }
    call(procedureCall) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error(`Method not implemented. ${procedureCall}`);
        });
    }
    executeTransaction(queries) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection.tx((t) => __awaiter(this, void 0, void 0, function* () {
                    for (const query of queries) {
                        yield t.query(query);
                    }
                }));
            }
            catch (error) {
                throw new errors_1.CustomError(400, error.message);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
}
exports.PgDatabase = PgDatabase;
