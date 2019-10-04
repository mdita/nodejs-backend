import { PhoneDetails } from '../repository/PhoneRepository'
import * as hash from 'object-hash';

export function initialData(): PhoneDetails[] {
  const metadata1 = hash({ key1: 'value1' });
  const metadata2 = hash({ key2: 'value2' });
  const metadata3 = hash({ key3: 'value3' });
  return [
    {
      type: 'normal',
      serial: '123-456-789',
      color: 'red',
      metadata: metadata1
    },
    {
      type: 'smartphone',
      serial: '456-123-789',
      color: 'blue',
      metadata: metadata2
    },
    {
      type: 'smartphone',
      serial: '789-456-789',
      color: 'green',
      metadata: metadata3
    }
  ]
}
