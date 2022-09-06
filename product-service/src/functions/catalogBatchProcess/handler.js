import { SNS } from 'aws-sdk';
import logger from '../../utils/logger';
import ProductService from '../../services/productService';

const { REGION, SNS_CREATE_PRODUCT_TOPIC_ARN } = process.env;

const snsClient = new SNS({ region: REGION });

const sendEmailNotification = async (product) => {
  const params = {
    Message: JSON.stringify(product),
    Subject: 'New product is created!',
    TopicArn: SNS_CREATE_PRODUCT_TOPIC_ARN,
    MessageAttributes: {
      price: {
        DataType: 'Number',
        StringValue: product.price.toString(),
      },
    },
  };

  logger.logInfo(`SNS params: ${JSON.stringify(params)}`);
  const data = await snsClient.publish(params).promise();
  logger.logInfo(`SNS message after publish: ${JSON.stringify(data)}`);
};

const catalogBatchProcess = async (event) => {
  try {
    logger.logRequest(event);
    const service = new ProductService();

    for (const record of event.Records) {
      const product = JSON.parse(record.body);
      const { id } = await service.createProduct(product);

      logger.logInfo(`product is created with the following id: ${id}`);

      await sendEmailNotification(product);
    }
  } catch (err) {
    logger.logError(err);
  }
};

export default catalogBatchProcess;
