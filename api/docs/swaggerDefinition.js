module.exports.swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Delilah Restó',
    version: '1.0.0',
    description:
      `This is a REST API made with Express for Delilah Restó. It retrieves data from MySQL server.
        As a client you can register, check the list of products and make orders.
        The admins can recieve those orders and update them. Also they can update the list of products.`,
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
    {
      url: 'https://delilahresto/api',
      description: 'Production server'
  },
  ]
}