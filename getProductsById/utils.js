import products from '../mocks/products.json';

export const getProductById = (productId) => {
  const product = products.filter((_product) => _product.id === productId)[0];
  return product;
};

export default {
  getProductById,
};
