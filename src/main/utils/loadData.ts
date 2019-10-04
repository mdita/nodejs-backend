import { PhoneDetails } from '../repository/PhoneRepository'

export function initialData(): PhoneDetails[] {
  return [
    {
      type: 'normal',
      serial: '123-456-789',
      color: 'red',
      metadata: 'some metadata'
    },
    {
      type: 'smartphone',
      serial: '456-123-789',
      color: 'blue',
      metadata: 'some metadata2'
    },
    {
      type: 'smartphone',
      serial: '789-456-789',
      color: 'green',
      metadata: 'some metadata3'
    }
  ]
}
