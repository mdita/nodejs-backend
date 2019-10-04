import * as winston from 'winston';

export default class Log {
  public static createLogger(): winston.Logger {
    return winston.createLogger({
        transports: [
            new winston.transports.Console()
        ]
    });
  }
}
