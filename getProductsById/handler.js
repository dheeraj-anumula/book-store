"use strict";
const utils = require("./utils.js");

module.exports.default = async (event) => {
  const productId = event.pathParameters.productId;

  if (!productId) {
    return {
      statusCode: 400,
    };
  }

  const product = utils.getProductById(productId);

  if (product) {
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } else {
    return {
      statusCode: 404,
    };
  }
};
