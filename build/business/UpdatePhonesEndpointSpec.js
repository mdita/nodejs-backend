"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressmocks_1 = require("expressmocks");
const UpdatePhoneEndpoint_1 = require("../business/UpdatePhoneEndpoint");
const sinon = require("sinon");
describe('UpdatePhonesEndpoint', () => {
    let phoneRepositoryStub;
    let sampleRequest;
    let updatePhonesEndpoint;
    beforeEach(() => {
        phoneRepositoryStub = {
            update: sinon.stub()
        };
        sampleRequest = {
            params: {
                id: '1234'
            },
            body: {
                data: 'data'
            }
        };
        phoneRepositoryStub.update.resolves(true);
        updatePhonesEndpoint = new UpdatePhoneEndpoint_1.default(phoneRepositoryStub);
    });
    it('should update the data and return true', () => {
        return expressmocks_1.default.create(sampleRequest)
            .test(updatePhonesEndpoint.updatePhone)
            .expectJson({ updated: true });
    });
    it('should return false when the data was not updated', () => {
        phoneRepositoryStub.update.resolves(false);
        return expressmocks_1.default.create(sampleRequest)
            .test(updatePhonesEndpoint.updatePhone)
            .expectJson({ updated: false });
    });
    it('should call next when the update failed', () => {
        const error = new Error('Something happened');
        phoneRepositoryStub.update.rejects(error);
        return expressmocks_1.default.create(sampleRequest)
            .test(updatePhonesEndpoint.updatePhone)
            .expectNext(error);
    });
    it('should return status 400 when id or data is missing', () => {
        delete sampleRequest.params.id;
        return expressmocks_1.default.create(sampleRequest)
            .test(updatePhonesEndpoint.updatePhone)
            .expectStatus(400);
    });
});
//# sourceMappingURL=UpdatePhonesEndpointSpec.js.map