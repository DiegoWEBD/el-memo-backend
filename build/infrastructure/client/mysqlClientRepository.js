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
exports.MysqlClientRepository = void 0;
const client_adapter_1 = require("./client.adapter");
const utils_1 = require("../../utils");
class MysqlClientRepository {
    constructor(database) {
        this.database = database;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'select * from client;';
            let response = yield this.database.query(query);
            const clients = response.data.map(client_adapter_1.adaptClient);
            for (const client of clients) {
                query =
                    'select phone_number from client_phone ' +
                        `where client_id = ${client.id};`;
                response = yield this.database.query(query);
                client.phones = response.data.map(row => row.phone_number);
            }
            return clients;
        });
    }
    add(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const birthDate = (0, utils_1.fromDateToMysqlStringDate)(client.birthDate);
            const registrationDate = (0, utils_1.fromDateToMysqlStringDate)(client.registrationDate);
            let phones = '';
            for (let i = 0; i < client.phones.length; ++i) {
                phones += client.phones[i];
                if (i !== client.phones.length - 1)
                    phones += ',';
            }
            let query = `insert_client("${client.name}", "${birthDate}", ${client.specialDiscount}, "${registrationDate}", "${phones}")`;
            yield this.database.call(query);
            query = 'select max(id) as new_client_id from client;';
            const { data } = yield this.database.query(query);
            client.id = data[0].new_client_id;
            return client;
        });
    }
    findById(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `select * from client where id = ${clientId};`;
            let response = yield this.database.query(query);
            if (response.data[0] === undefined)
                return null;
            const client = (0, client_adapter_1.adaptClient)(response.data[0]);
            query =
                'select phone_number from client_phone ' +
                    `where client_id = ${client.id};`;
            response = yield this.database.query(query);
            client.phones = response.data.map(row => row.phone_number);
            return client;
        });
    }
    remove(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `delete from client where id = ${clientId};`;
            yield this.database.query(query);
        });
    }
}
exports.MysqlClientRepository = MysqlClientRepository;
