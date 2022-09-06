import { SQS } from "aws-sdk";
import logger from "./logger";

const { CATALOG_QUEUE_URL } = process.env;

export default class SQSService {
  sqs;

  constructor() {
    this.sqs = new SQS({ apiVersion: "2012-11-05" });
  }

  async sendSqsMessage(product) {
    logger.logInfo("Sending product by SQS");
    try {
      const params = {
        MessageBody: JSON.stringify(product),
        QueueUrl: CATALOG_QUEUE_URL,
      };
      logger.logInfo(`SQS params: ${JSON.stringify(params)}`);

      await this.sqs.sendMessage(params).promise();
    } catch (err) {
      logger.logError(`SQS error: ${JSON.stringify(err)}`);
    }
  }
}
