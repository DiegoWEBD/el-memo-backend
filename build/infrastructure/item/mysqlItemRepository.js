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
exports.MysqlItemRepository = void 0;
class MysqlItemRepository {
    constructor(database) {
        this.database = database;
    }
    add(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'insert into item(code, description, price) ' +
                `values ("${item.code}", "${item.description}", ${item.price});`;
            yield this.database.query(query);
        });
    }
    update(itemCode, newValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'update item set ' +
                `code = "${newValues.code}", ` +
                `description = "${newValues.description}" ` +
                `price = "${newValues.price}" ` +
                `where code = "${itemCode}";`;
            yield this.database.query(query);
        });
    }
    findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select * from item where code = "${code}";`;
            const { data } = yield this.database.query(query);
            const item = data[0];
            return item === undefined ? null : item;
        });
    }
    generateCode() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.database.query('select * from item;');
            const codes = data.map(item => item.code);
            const characters = '0123456789';
            let newCode;
            const codeLength = 10;
            do {
                newCode = '';
                for (let i = 0; i < codeLength; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    newCode += characters.charAt(randomIndex);
                }
            } while (codes.includes(newCode));
            return newCode;
        });
    }
}
exports.MysqlItemRepository = MysqlItemRepository;
