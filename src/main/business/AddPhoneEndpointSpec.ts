import ExpressMocks from 'expressmocks';
import AddPhoneEndpoint from '../business/AddPhoneEndpoint';
import * as sinon from 'sinon';

describe('AddPhoneEndpoint', () => {
    let phoneRepositoryStub: any
    let sampleRequest: any
    let addPhoneEndpoint: AddPhoneEndpoint

    beforeEach(() => {
        phoneRepositoryStub = {
            store: sinon.stub()
        }
        sampleRequest = {
          body: {
            data: 'data'
          }
        }
        phoneRepositoryStub.store.resolves(true);
        addPhoneEndpoint = new AddPhoneEndpoint(phoneRepositoryStub);
    })

    it('should add the data and return true', () => {
      return ExpressMocks.create(sampleRequest)
        .test(addPhoneEndpoint.addPhone)
        .expectJson({ added: true });
    })

    it('should return false when the data was not added', () => {
      phoneRepositoryStub.store.resolves(false);

      return ExpressMocks.create(sampleRequest)
        .test(addPhoneEndpoint.addPhone)
        .expectJson({ added: false });
    })

    it('should call next when the adding failed', () => {
      const error = new Error('Something happened');
      phoneRepositoryStub.store.rejects(error);

      return ExpressMocks.create(sampleRequest)
        .test(addPhoneEndpoint.addPhone)
        .expectNext(error);
    })

    it('should return status 400 when id or data is missing', () => {
      delete sampleRequest.body;

      return ExpressMocks.create(sampleRequest)
        .test(addPhoneEndpoint.addPhone)
        .expectStatus(400);
    })
})
