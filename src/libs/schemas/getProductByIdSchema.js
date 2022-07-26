const schema = {
  properties: {
    queryStringParameters: {
      type: 'object',
      properties: {
        productId: {
          type: 'string',
        },
      },
    },
  },
  required: ['queryStringParameters'],
};

export default schema;
