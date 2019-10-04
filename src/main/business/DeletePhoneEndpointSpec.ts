import ExpressMocks from 'expressmocks';
import DeletePhoneEndpoint from '../business/DeletePhoneEndpoint';
import * as sinon from 'sinon';

describe('DeletePhoneEndpoint', () => {
    let phoneRepositoryStub: any
    let sampleRequest: any
    let deletePhoneEndpoint: DeletePhoneEndpoint

    beforeEach(() => {
        phoneRepositoryStub = {
            delete: sinon.stub()
        }
        sampleRequest = {
          params: {
            id: '1234'
          }
        }
        phoneRepositoryStub.delete.resolves(true);
        deletePhoneEndpoint = new DeletePhoneEndpoint(phoneRepositoryStub);
    })

    it('should delete the data and return true', () => {
      return ExpressMocks.create(sampleRequest)
        .test(deletePhoneEndpoint.deletePhone)
        .expectJson({ deleted: true });
    })

    it('should return false when the data was not deleted', () => {
      phoneRepositoryStub.delete.resolves(false);

      return ExpressMocks.create(sampleRequest)
        .test(deletePhoneEndpoint.deletePhone)
        .expectJson({ deleted: false });
    })

    it('should call next when the delete failed', () => {
      const error = new Error('Something happened');
      phoneRepositoryStub.delete.rejects(error);

      return ExpressMocks.create(sampleRequest)
        .test(deletePhoneEndpoint.deletePhone)
        .expectNext(error);
    })

    it('should return status 400 when id or data is missing', () => {
      delete sampleRequest.params.id;

      return ExpressMocks.create(sampleRequest)
        .test(deletePhoneEndpoint.deletePhone)
        .expectStatus(400);
    })
})
