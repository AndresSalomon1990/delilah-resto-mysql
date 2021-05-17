const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

/* Authentication */
const authentication = require('./api/services/authentication.js');

const PORT = process.env.PORT || 3000;

const apiLimiterLogin = rateLimit({
    max: 10
});

/* CORS */
const isProduction = process.env.NODE_ENV === 'production';
const origin = {
  origin: isProduction ? 'https://www.delilahresto.com' : 'http://localhost:3000/api',
};

app.use(compression());
app.use(helmet());
app.use(cors(origin));
app.use(express.json());
app.use('/api/login', apiLimiterLogin);

/* All the routes under /api path */
const apiRouter = require('./api/api.js');
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server listen at port: ${PORT}`);
});