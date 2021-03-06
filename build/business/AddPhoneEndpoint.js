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
class AddPhoneEndpoint {
    constructor(phoneRepository) {
        this.phoneRepository = phoneRepository;
        this.addPhone = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body ? req.body : undefined;
                if ((data && Object.keys(data).length === 0)) {
                    return res.status(400).json({ error: 'Bad request' });
                }
                const result = yield this.phoneRepository.store(data);
                res.status(200).json({ added: result });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = AddPhoneEndpoint;
//# sourceMappingURL=AddPhoneEndpoint.js.map