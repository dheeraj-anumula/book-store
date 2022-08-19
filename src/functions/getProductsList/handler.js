import createError from 'http-errors';
import lambdaMiddleware from '../../libs/lambdaMiddleware';
import ProductService from '../../services/productService';
import logger from '../../utils/logger';

const handler = async (event) => {
  try {
    const { body, queryParameters, pathParameters } = event;
    logger.logRequest(
      `GET /products request body:${body}, queryParameters: ${queryParameters}, pathParameters: ${pathParameters}`
    );

    const productService = new ProductService();
    const products = await productService.getAllProducts();

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    logger.logError(error);
    throw new createError.InternalServerError(`Internal Server Error ${error}`);
  }
};

export default lambdaMiddleware(handler);
