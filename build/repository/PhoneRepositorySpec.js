"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhoneRepository_1 = require("../repository/PhoneRepository");
const chai_1 = require("chai");
describe('PhoneRepository', () => {
    let allPhones;
    let phoneRepository;
    beforeEach(() => {
        allPhones = {
            allPhones: [
                { type: 'normal',
                    serial: '123-456-789',
                    color: 'red',
                    metadata: '7e619f7b49e9b5eaedfd798ffa87e494d78128a8' },
                { type: 'smartphone',
                    serial: '456-123-789',
                    color: 'blue',
                    metadata: '2fedbb8e593c09cc123907b895866a17720bd42e' },
                { type: 'smartphone',
                    serial: '789-456-789',
                    color: 'green',
                    metadata: 'cd82e9aefa3ef797a4d3b7d2cfd0ae7c27bfe701' }
            ]
        };
        phoneRepository = new PhoneRepository_1.default();
    });
    it('should fetch all phones', () => {
        const phones = phoneRepository.fetchAll();
        chai_1.expect(phones).to.deep.equal(allPhones);
    });
    it('should delete phone', () => {
        const result = phoneRepository.delete('789-456-789');
        chai_1.expect(result).to.deep.equal(true);
    });
    it('should return false when the id we want to delete is not existing', () => {
        const result = phoneRepository.delete('3213213213123');
        chai_1.expect(result).to.deep.equal(false);
    });
    it('should update phone', () => {
        const data = {
            type: 'normal',
            serial: '789-456-789',
            color: 'blue',
            metadata: 'another metadata'
        };
        const result = phoneRepository.update('789-456-789', data);
        chai_1.expect(result).to.deep.equal(true);
    });
    it('should not update phone details when the id is not existing', () => {
        const data = {
            type: 'normal',
            serial: '789-456-789',
            color: 'blue',
            metadata: 'another metadata'
        };
        const result = phoneRepository.update('123123213', data);
        chai_1.expect(result).to.deep.equal(false);
    });
    it('should store phone data when serial is unique', () => {
        const data = {
            type: 'smartphone',
            serial: '666',
            color: 'red',
            metadata: 'metadata'
        };
        const result = phoneRepository.store(data);
        chai_1.expect(result).to.deep.equal(true);
    });
    it('should not store phone data when serial is not unique', () => {
        const data = {
            type: 'smartphone',
            serial: '789-456-789',
            color: 'red',
            metadata: 'metadata'
        };
        const result = phoneRepository.store(data);
        chai_1.expect(result).to.deep.equal(false);
    });
});
//# sourceMappingURL=PhoneRepositorySpec.js.map