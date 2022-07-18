"use strict";

const products = require("../mocks/products.json");

module.exports.default = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};
