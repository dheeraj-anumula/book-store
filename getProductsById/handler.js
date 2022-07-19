import { getProductById } from './utils.js';

export default async (event) => {
  const productId = event.pathParameters.productId;

  if (!productId) {
    return {
      statusCode: 400,
    };
  }

  const product = getProductById(productId);

  if (product) {
    return {
      statusCode: 200,
      body: JSON.stringify(product),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
  return {
    statusCode: 404,
  };
};
