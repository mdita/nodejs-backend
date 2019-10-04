"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
class Log {
    static createLogger() {
        return winston.createLogger({
            transports: [
                new winston.transports.Console()
            ]
        });
    }
}
exports.default = Log;
//# sourceMappingURL=Log.js.map