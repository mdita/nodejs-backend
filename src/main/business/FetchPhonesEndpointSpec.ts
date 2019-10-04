import ExpressMocks from 'expressmocks';
import FetchPhonesEndpoint from './FetchPhonesEndpoint';
import * as sinon from 'sinon';

describe('FetchPhonesEndpoint', () => {
    let phoneRepositoryStub: any
    let fetchPhonesEndpoint: FetchPhonesEndpoint

    beforeEach(() => {
        phoneRepositoryStub = {
            fetchAll: sinon.stub()
        }
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
        })
        fetchPhonesEndpoint = new FetchPhonesEndpoint(phoneRepositoryStub);
    })

    it('should return the data that contains all phones', () => {
      return ExpressMocks.create({})
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
    })

    it('should call next when the fetch failed', () => {
      const error = new Error('Something happened');
      phoneRepositoryStub.fetchAll.rejects(error);

      return ExpressMocks.create({})
        .test(fetchPhonesEndpoint.fetchPhones)
        .expectNext(error);
    })
})
