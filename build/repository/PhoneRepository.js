"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loadData_1 = require("../utils/loadData");
class PhoneRepository {
    constructor() {
        this.phones = loadData_1.initialData();
    }
    store(data) {
        let wasAdded = false;
        const id = data.serial;
        const results = this.phones.filter(phone => phone.serial === id);
        if (results.length === 0) {
            this.phones.push(data);
            wasAdded = true;
        }
        return wasAdded;
    }
    update(id, data) {
        let wasUpdated = false;
        const results = this.phones.filter(phone => phone.serial === id);
        if (results.length !== 0) {
            this.delete(id);
            this.phones.push(data);
            wasUpdated = true;
        }
        return wasUpdated;
    }
    delete(id) {
        let wasDeleted = false;
        const results = this.phones.filter(phone => phone.serial !== id);
        if (results.length !== this.phones.length) {
            wasDeleted = true;
            this.refreshData(results);
        }
        return wasDeleted;
    }
    fetchAll() {
        return {
            allPhones: this.phones
        };
    }
    refreshData(phones) {
        this.phones = phones;
    }
}
exports.default = PhoneRepository;
//# sourceMappingURL=PhoneRepository.js.map