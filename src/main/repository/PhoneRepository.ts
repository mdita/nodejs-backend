import { initialData } from '../utils/loadData'

export interface PhoneDetails {
    type: string
    serial: string // can be use as a key because is unique
    color: string
    metadata: string
}

export interface FetchAllResponse {
    allPhones: PhoneDetails[]
}

export default class PhoneRepository {
  private phones: PhoneDetails[]
    constructor() {
      this.phones = initialData();
    }

    public store(data: PhoneDetails): boolean {
      let wasAdded = false;
      const id = data.serial;
      const results: PhoneDetails[] = this.phones.filter(phone => phone.serial === id);
      if (results.length === 0) {
        this.phones.push(data);
        wasAdded = true;
      }

      return wasAdded;
    }

    public update(id: string, data: PhoneDetails): boolean {
      let wasUpdated = false;
      const results: PhoneDetails[] = this.phones.filter(phone => phone.serial === id);

      if (results.length !== 0) {
        this.delete(id);
        this.phones.push(data);
        wasUpdated = true;
      }
      return wasUpdated
    }

    public delete(id: string): boolean {
      let wasDeleted = false;
      const results: PhoneDetails[] = this.phones.filter(phone => phone.serial !== id);

      if (results.length !== this.phones.length) {
        wasDeleted = true;
        this.refreshData(results);
      }

      return wasDeleted;
    }

    public fetchAll(): FetchAllResponse {
      return {
        allPhones : this.phones
      }
    }

    private refreshData(phones: PhoneDetails[]): void {
      this.phones = phones;
    }
}
