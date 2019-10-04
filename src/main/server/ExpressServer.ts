import * as express from 'express'
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as methodOverride from 'method-override'
import * as cors from 'cors';

import { Express } from 'express' // tslint:disable-line no-duplicate-imports
import { Server } from 'http'

import Log from '../logging/Log'

import AddPhoneEndpoint from '../business/AddPhoneEndpoint'
import DeletePhoneEndpoint from '../business/DeletePhoneEndpoint'
import FetchPhonesEndpoint from '../business/FetchPhonesEndpoint'
import UpdatePhoneEndpoint from '../business/UpdatePhoneEndpoint'

const log = Log.createLogger();

export default class ExpressServer {
    private server?: Express
    private httpServer?: Server

    constructor(
      private addPhoneEndpoint: AddPhoneEndpoint,
      private deletePhoneEndpoint: DeletePhoneEndpoint,
      private fetchPhonesEndpoint: FetchPhonesEndpoint,
      private updatePhoneEndpoint: UpdatePhoneEndpoint,
    ) {}

    public async setup(port: number) {
      const server = express();

      this.listen(server, port);
      this.setupStandardMiddlewares(server)
      this.configureEndpoint(server);

      this.server = server
      return this.server
    }

    public close() {
        if (this.httpServer) {
            log.info('Closing Express Server');
            return this.httpServer.close();
        }
    }

    private listen(server: Express, port: number): Server {
        const httpServer = server.listen(port);

        log.info(`Server is listening on port: ${port}`);
        return httpServer;
    }

    private configureEndpoint(server: Express) {
        log.info('configure endpoints...');

        // server.get('/personal/api/ui/person', defaultMiddlewares, this.cdmDataEndpoints.fetchPersonalDataForUi)
        server.get('/api/all/phones', this.fetchPhonesEndpoint.fetchPhones);

        server.put('/api/update/phone/:id', this.updatePhoneEndpoint.updatePhone);

        server.post('/api/add/phone', this.addPhoneEndpoint.addPhone);

        server.delete('/api/delete/phone/:id', this.deletePhoneEndpoint.deletePhone);
    }

    private setupStandardMiddlewares(server: Express) {
      log.info('configure standard middlewares...');

      server.use(logger('dev'));
      server.use(bodyParser.json());
      server.use(methodOverride());
      server.use(cors());
    }
}
