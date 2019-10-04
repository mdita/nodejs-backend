import ExpressMocks from 'expressmocks';
import UpdatePhonesEndpoint from '../business/UpdatePhoneEndpoint';
import * as sinon from 'sinon';

describe('UpdatePhonesEndpoint', () => {
    let phoneRepositoryStub: any
    let sampleRequest: any
    let updatePhonesEndpoint: UpdatePhonesEndpoint

    beforeEach(() => {
        phoneRepositoryStub = {
            update: sinon.stub()
        }
        sampleRequest = {
          params: {
            id: '1234'
          },
          body: {
            data: 'data'
          }
        }
        phoneRepositoryStub.update.resolves(true);
        updatePhonesEndpoint = new UpdatePhonesEndpoint(phoneRepositoryStub);
    })

    it('should update the data and return true', () => {
      return ExpressMocks.create(sampleRequest)
        .test(updatePhonesEndpoint.updatePhone)
        .expectJson({ updated: true });
    })

    it('should return false when the data was not updated', () => {
      phoneRepositoryStub.update.resolves(false);

      return ExpressMocks.create(sampleRequest)
        .test(updatePhonesEndpoint.updatePhone)
        .expectJson({ updated: false });
    })

    it('should call next when the update failed', () => {
      const error = new Error('Something happened');
      phoneRepositoryStub.update.rejects(error);

      return ExpressMocks.create(sampleRequest)
        .test(updatePhonesEndpoint.updatePhone)
        .expectNext(error);
    })

    it('should return status 400 when id or data is missing', () => {
      delete sampleRequest.params.id;

      return ExpressMocks.create(sampleRequest)
        .test(updatePhonesEndpoint.updatePhone)
        .expectStatus(400);
    })
})
