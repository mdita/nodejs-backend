"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressmocks_1 = require("expressmocks");
const AddPhoneEndpoint_1 = require("../business/AddPhoneEndpoint");
const sinon = require("sinon");
describe('AddPhoneEndpoint', () => {
    let phoneRepositoryStub;
    let sampleRequest;
    let addPhoneEndpoint;
    beforeEach(() => {
        phoneRepositoryStub = {
            store: sinon.stub()
        };
        sampleRequest = {
            body: {
                data: 'data'
            }
        };
        phoneRepositoryStub.store.resolves(true);
        addPhoneEndpoint = new AddPhoneEndpoint_1.default(phoneRepositoryStub);
    });
    it('should add the data and return true', () => {
        return expressmocks_1.default.create(sampleRequest)
            .test(addPhoneEndpoint.addPhone)
            .expectJson({ added: true });
    });
    it('should return false when the data was not added', () => {
        phoneRepositoryStub.store.resolves(false);
        return expressmocks_1.default.create(sampleRequest)
            .test(addPhoneEndpoint.addPhone)
            .expectJson({ added: false });
    });
    it('should call next when the adding failed', () => {
        const error = new Error('Something happened');
        phoneRepositoryStub.store.rejects(error);
        return expressmocks_1.default.create(sampleRequest)
            .test(addPhoneEndpoint.addPhone)
            .expectNext(error);
    });
    it('should return status 400 when id or data is missing', () => {
        delete sampleRequest.body;
        return expressmocks_1.default.create(sampleRequest)
            .test(addPhoneEndpoint.addPhone)
            .expectStatus(400);
    });
});
//# sourceMappingURL=AddPhoneEndpointSpec.js.map