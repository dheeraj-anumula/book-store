import products from '../mocks/products.json';

export default async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};
