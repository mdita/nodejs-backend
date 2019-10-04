import ExpressServer from './ExpressServer'

import AddPhoneEndpoint from '../business/AddPhoneEndpoint'
import DeletePhoneEndpoint from '../business/DeletePhoneEndpoint'
import FetchPhonesEndpoint from '../business/FetchPhonesEndpoint'
import UpdatePhoneEndpoint from '../business/UpdatePhoneEndpoint'

import PhoneRepository from '../repository/PhoneRepository'

export default class Application {
    public static async create() {
      const phoneRepository = new PhoneRepository();

      const addPhoneEndpoint = new AddPhoneEndpoint(phoneRepository);
      const deletePhoneEndpoint = new DeletePhoneEndpoint(phoneRepository);
      const fetchPhonesEndpoint = new FetchPhonesEndpoint(phoneRepository);
      const updatePhoneEndpoint = new UpdatePhoneEndpoint(phoneRepository);

      const expressServer = new ExpressServer(
        addPhoneEndpoint,
        deletePhoneEndpoint,
        fetchPhonesEndpoint,
        updatePhoneEndpoint
      );

      // Internal endpoint
      await expressServer.setup(3000);
    }
}
