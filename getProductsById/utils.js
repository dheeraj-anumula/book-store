const products = require("../mocks/products.json");

const getProductById = (productId) => {
  const product = products.filter((product) => product.id === productId)[0];
  return product;
};

module.exports.getProductById = getProductById;
