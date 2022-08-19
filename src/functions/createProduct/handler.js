import createError from 'http-errors';
import validator from '@middy/validator';
import schema from '../../libs/schemas/createProductSchema';
import ProductService from '../../services/productService';
import lambdaMiddleware from '../../libs/lambdaMiddleware';
import logger from '../../utils/logger';

export const createProduct = async (event) => {
  try {
    const { body, queryParameters, pathParameters } = event;
    logger.logRequest(
      `POST /products request body:${body}, queryParameters: ${queryParameters}, pathParameters: ${pathParameters}`
    );

    const { title, description, price, count } = event.body;
    const productService = new ProductService();
    const product = await productService.createProduct({ title, description, price, count });

    logger.logInfo(`Product is created : ${JSON.stringify(product)}`);

    return {
      statusCode: 201,
      body: JSON.stringify(product),
    };
  } catch (error) {
    logger.logError(error);
    throw new createError.InternalServerError(`Internal Server Error ${error}`);
  }
};

export default lambdaMiddleware(createProduct).use(
  validator({
    inputSchema: schema,
  })
);
