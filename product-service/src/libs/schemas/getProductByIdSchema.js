const schema = {
  type: 'object',
  properties: {
    pathParameters: {
      type: 'object',
      properties: {
        productId: {
          type: 'string',
        },
      },
      required: ['productId'],
    },
  },
  required: ['pathParameters'],
};

export default schema;
