import createError from 'http-errors';
import lambdaMiddleware from '../../libs/lambdaMiddleware';
import ProductService from '../../services/productService';
import logger from '../../utils/logger';

const handler = async (event) => {
  try {
    logger.logRequest(`GET /products request ${event}`);

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
