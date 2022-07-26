import validator from '@middy/validator';
import createError from 'http-errors';
import lambdaMiddleware from '../../libs/lambdaMiddleware';
import schema from '../../libs/schemas/createProductSchema';
import ProductService from '../../services/productService';
import logger from '../../utils/logger';

const handler = async (event) => {
  try {
    logger.logRequest(`GET /product request ${event}`);

    const productId = event.pathParameters.productId;

    if (!productId) {
      logger.logRequest(`GET /product request - Bad request ${event}`);
      throw new createError.BadRequest('"productId" is required');
    }

    const productService = new ProductService();
    const product = await productService.getProductsById(productId);

    if (!product) {
      logger.logRequest(`GET /product request - Not found ${event}`);
      throw new createError.NotFound(`Product with productId ${productId} is not found`);
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    }
  } catch (error) {
    logger.logError(error);
    throw new createError.InternalServerError(`Internal Server Error ${error}`);
  }
};

export default lambdaMiddleware(handler).use(
  validator({
    inputSchema: schema,
  })
);
