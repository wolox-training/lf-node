module.exports = {
  firstname: {
    type: 'string',
    example: 'Tom'
  },
  lastname: {
    type: 'string',
    example: 'Acosta'
  },
  email: {
    type: 'string',
    example: 'tom.engels@wolox.com.ar'
  },
  password: {
    type: 'string',
    example: 'fdsddsasga'
  },
  User: {
    type: 'object',
    properties: {
      firstname: {
        $ref: '#/components/schemas/firstname'
      },
      lastname: {
        $ref: '#/components/schemas/lastname'
      },
      mail: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  }
};
