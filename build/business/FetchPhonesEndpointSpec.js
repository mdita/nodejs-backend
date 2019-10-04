"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressmocks_1 = require("expressmocks");
const FetchPhonesEndpoint_1 = require("./FetchPhonesEndpoint");
const sinon = require("sinon");
describe('FetchPhonesEndpoint', () => {
    let phoneRepositoryStub;
    let fetchPhonesEndpoint;
    beforeEach(() => {
        phoneRepositoryStub = {
            fetchAll: sinon.stub()
        };
        phoneRepositoryStub.fetchAll.resolves({
            allPhones: [
                {
                    type: 'normal',
                    serial: '123-456-789',
                    color: 'red',
                    metadata: 'some metadata'
                },
                {
                    type: 'smartphone',
                    serial: '789-123-456',
                    color: 'red',
                    metadata: 'some metadata2'
                }
            ]
        });
        fetchPhonesEndpoint = new FetchPhonesEndpoint_1.default(phoneRepositoryStub);
    });
    it('should return the data that contains all phones', () => {
        return expressmocks_1.default.create({})
            .test(fetchPhonesEndpoint.fetchPhones)
            .expectJson({
            allPhones: [
                {
                    type: 'normal',
                    serial: '123-456-789',
                    color: 'red',
                    metadata: 'some metadata'
                },
                {
                    type: 'smartphone',
                    serial: '789-123-456',
                    color: 'red',
                    metadata: 'some metadata2'
                }
            ]
        });
    });
    it('should call next when the fetch failed', () => {
        const error = new Error('Something happened');
        phoneRepositoryStub.fetchAll.rejects(error);
        return expressmocks_1.default.create({})
            .test(fetchPhonesEndpoint.fetchPhones)
            .expectNext(error);
    });
});
//# sourceMappingURL=FetchPhonesEndpointSpec.js.map