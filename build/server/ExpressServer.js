"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const cors = require("cors");
const Log_1 = require("../logging/Log");
const log = Log_1.default.createLogger();
class ExpressServer {
    constructor(addPhoneEndpoint, deletePhoneEndpoint, fetchPhonesEndpoint, updatePhoneEndpoint) {
        this.addPhoneEndpoint = addPhoneEndpoint;
        this.deletePhoneEndpoint = deletePhoneEndpoint;
        this.fetchPhonesEndpoint = fetchPhonesEndpoint;
        this.updatePhoneEndpoint = updatePhoneEndpoint;
    }
    setup(port) {
        return __awaiter(this, void 0, void 0, function* () {
            const server = express();
            this.listen(server, port);
            this.setupStandardMiddlewares(server);
            this.configureEndpoint(server);
            this.server = server;
            return this.server;
        });
    }
    close() {
        if (this.httpServer) {
            log.info('Closing Express Server');
            return this.httpServer.close();
        }
    }
    listen(server, port) {
        const httpServer = server.listen(port);
        log.info(`Server is listening on port: ${port}`);
        return httpServer;
    }
    configureEndpoint(server) {
        log.info('configure endpoints...');
        server.get('/api/all/phones', this.fetchPhonesEndpoint.fetchPhones);
        server.put('/api/update/phone/:id', this.updatePhoneEndpoint.updatePhone);
        server.post('/api/add/phone', this.addPhoneEndpoint.addPhone);
        server.delete('/api/delete/phone/:id', this.deletePhoneEndpoint.deletePhone);
    }
    setupStandardMiddlewares(server) {
        log.info('configure standard middlewares...');
        server.use(logger('dev'));
        server.use(bodyParser.json());
        server.use(methodOverride());
        server.use(cors());
    }
}
exports.default = ExpressServer;
//# sourceMappingURL=ExpressServer.js.map