import validator from '@middy/validator';
import createError from 'http-errors';
import lambdaMiddleware from '../../libs/lambdaMiddleware';
import schema from '../../libs/schemas/getProductByIdSchema';
import ProductService from '../../services/productService';
import logger from '../../utils/logger';

const handler = async (event) => {
  let product;
  let productId;

  try {
    const { body, queryParameters, pathParameters } = event;
    logger.logRequest(
      `GET /product/{productId} request body:${body}, queryParameters: ${queryParameters}, pathParameters: ${pathParameters}`
    );

    productId = event.pathParameters.productId;

    if (!productId) {
      logger.logRequest(`GET /product request - Bad request ${event}`);
      throw new createError.BadRequest('"productId" is required');
    }

    const productService = new ProductService();
    product = await productService.getProductsById(productId);
  } catch (error) {
    logger.logError(error);
    throw new createError.InternalServerError(`Internal Server Error ${error}`);
  }

  if (!product) {
    logger.logRequest(`GET /product request - Not found ${event}`);
    throw new createError.NotFound(`Product with productId ${productId} is not found`);
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  }
};

export default lambdaMiddleware(handler).use(
  validator({
    inputSchema: schema,
  })
);
