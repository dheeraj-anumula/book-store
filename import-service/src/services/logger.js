import { createLogger, format, transports } from "winston";

class WinstonLogger {
  constructor() {
    this.format = format.combine(
      format.colorize(),
      format.timestamp(),
      format.align(),
      format.errors({ stack: true }),
      format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    );

    this.logger = createLogger({
      level: process.env.ENV_STAGE === "prod" ? "error" : "info",
      format: this.format,
      transports: [new transports.Console()],
    });
  }

  logInfo(message) {
    this.logger.info(message);
  }

  logRequest(event) {
    this.logInfo(`Incoming event: ${JSON.stringify(event)}`);
  }

  logError(message) {
    this.logger.error(message);
  }
}

export default new WinstonLogger();
