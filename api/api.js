const express = require('express');
const apiRouter = express.Router();

/* Authentication */
const authentication = require('./services/authentication.js');

/* Check API status */
apiRouter.get('/status', (req, res) => {
  res.send('Bienvenidos a mi API de express para Delilah Restó');
});

/* PATH /api/registrar */
const registerRouter = require('./routers/register.js');
apiRouter.use('/registrar', registerRouter);

/* PATH /api/login */
const loginRouter = require('./routers/login.js');
apiRouter.use('/login', loginRouter);

/* PATH /api/productos */
const productsRouter = require('./routers/products.js');
apiRouter.use('/productos', authentication.verifyUser, productsRouter);

/* PATH /api/usuarios */
const usersRouter = require('./routers/users.js');
apiRouter.use('/usuarios', authentication.verifyUser, usersRouter);

/* PATH /api/ordenes */
const ordersRouter = require('./routers/orders.js');
apiRouter.use('/ordenes', authentication.verifyUser, ordersRouter);

/* Swagger */
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./docs/swaggerDefinition.js');

const options = {
  ...swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./api/docs/swaggerApis.js']
};

const swaggerSpec = swaggerJsDoc(options);

apiRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Generate json from the docs */
apiRouter.get('/api-docs.json', (req, res) => {
  res.send(swaggerSpec);
});

module.exports = apiRouter;