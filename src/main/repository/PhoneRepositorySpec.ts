import PhoneRepository from '../repository/PhoneRepository';
import { expect } from 'chai'

describe('PhoneRepository', () => {
    let allPhones: any
    let phoneRepository: PhoneRepository

    beforeEach(() => {
        allPhones = {
          allPhones: [
            { type: 'normal',
                serial: '123-456-789',
                color: 'red',
                metadata: 'some metadata' },
              { type: 'smartphone',
                serial: '456-123-789',
                color: 'blue',
                metadata: 'some metadata2' },
              { type: 'smartphone',
                serial: '789-456-789',
                color: 'green',
                metadata: 'some metadata3' }
          ]
        }
        phoneRepository = new PhoneRepository()
    })

    it('should fetch all phones', () => {
      const phones = phoneRepository.fetchAll();
      expect(phones).to.deep.equal(allPhones);
    })

    it('should delete phone', () => {
      const result = phoneRepository.delete('789-456-789');
      expect(result).to.deep.equal(true);
    })

    it('should return false when the id we want to delete is not existing', () => {
      const result = phoneRepository.delete('3213213213123');
      expect(result).to.deep.equal(false);
    })

    it('should update phone', () => {
      const data = {
        type: 'normal',
        serial: '789-456-789',
        color: 'blue',
        metadata: 'another metadata'
      }
      const result = phoneRepository.update('789-456-789', data);
      expect(result).to.deep.equal(true);
    })

    it('should not update phone details when the id is not existing', () => {
      const data = {
        type: 'normal',
        serial: '789-456-789',
        color: 'blue',
        metadata: 'another metadata'
      }
      const result = phoneRepository.update('123123213', data);
      expect(result).to.deep.equal(false);
    })

    it('should store phone data when serial is unique', () => {
      const data = {
        type: 'smartphone',
        serial: '666',
        color: 'red',
        metadata: 'metadata'
      }
      const result = phoneRepository.store(data);
      expect(result).to.deep.equal(true);
    })

    it('should not store phone data when serial is not unique', () => {
      const data = {
        type: 'smartphone',
        serial: '789-456-789',
        color: 'red',
        metadata: 'metadata'
      }
      const result = phoneRepository.store(data);
      expect(result).to.deep.equal(false);
    })
})
