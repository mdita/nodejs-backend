"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressmocks_1 = require("expressmocks");
const DeletePhoneEndpoint_1 = require("../business/DeletePhoneEndpoint");
const sinon = require("sinon");
describe('DeletePhoneEndpoint', () => {
    let phoneRepositoryStub;
    let sampleRequest;
    let deletePhoneEndpoint;
    beforeEach(() => {
        phoneRepositoryStub = {
            delete: sinon.stub()
        };
        sampleRequest = {
            params: {
                id: '1234'
            }
        };
        phoneRepositoryStub.delete.resolves(true);
        deletePhoneEndpoint = new DeletePhoneEndpoint_1.default(phoneRepositoryStub);
    });
    it('should delete the data and return true', () => {
        return expressmocks_1.default.create(sampleRequest)
            .test(deletePhoneEndpoint.deletePhone)
            .expectJson({ deleted: true });
    });
    it('should return false when the data was not deleted', () => {
        phoneRepositoryStub.delete.resolves(false);
        return expressmocks_1.default.create(sampleRequest)
            .test(deletePhoneEndpoint.deletePhone)
            .expectJson({ deleted: false });
    });
    it('should call next when the delete failed', () => {
        const error = new Error('Something happened');
        phoneRepositoryStub.delete.rejects(error);
        return expressmocks_1.default.create(sampleRequest)
            .test(deletePhoneEndpoint.deletePhone)
            .expectNext(error);
    });
    it('should return status 400 when id or data is missing', () => {
        delete sampleRequest.params.id;
        return expressmocks_1.default.create(sampleRequest)
            .test(deletePhoneEndpoint.deletePhone)
            .expectStatus(400);
    });
});
//# sourceMappingURL=DeletePhoneEndpointSpec.js.map