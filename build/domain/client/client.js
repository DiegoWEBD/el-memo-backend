"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
class Client {
    constructor(id, name, specialDiscount, birthDate, registrationDate, phones) {
        this.id = id;
        this.name = name;
        this.specialDiscount = specialDiscount;
        this.birthDate = birthDate;
        this.registrationDate = registrationDate;
        this.phones = phones;
    }
}
exports.Client = Client;
