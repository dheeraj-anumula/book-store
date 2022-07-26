const schema = {
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        price: {
          type: 'string',
        },
        count: {
          type: 'string',
        },
      },
      required: ['title', 'description', 'price', 'count'],
    },
  },
};

export default schema;
