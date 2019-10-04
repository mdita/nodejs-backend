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
const ExpressServer_1 = require("./ExpressServer");
const AddPhoneEndpoint_1 = require("../business/AddPhoneEndpoint");
const DeletePhoneEndpoint_1 = require("../business/DeletePhoneEndpoint");
const FetchPhonesEndpoint_1 = require("../business/FetchPhonesEndpoint");
const UpdatePhoneEndpoint_1 = require("../business/UpdatePhoneEndpoint");
const PhoneRepository_1 = require("../repository/PhoneRepository");
class Application {
    static create() {
        return __awaiter(this, void 0, void 0, function* () {
            const phoneRepository = new PhoneRepository_1.default();
            const addPhoneEndpoint = new AddPhoneEndpoint_1.default(phoneRepository);
            const deletePhoneEndpoint = new DeletePhoneEndpoint_1.default(phoneRepository);
            const fetchPhonesEndpoint = new FetchPhonesEndpoint_1.default(phoneRepository);
            const updatePhoneEndpoint = new UpdatePhoneEndpoint_1.default(phoneRepository);
            const expressServer = new ExpressServer_1.default(addPhoneEndpoint, deletePhoneEndpoint, fetchPhonesEndpoint, updatePhoneEndpoint);
            yield expressServer.setup(3000);
        });
    }
}
exports.default = Application;
//# sourceMappingURL=Application.js.map