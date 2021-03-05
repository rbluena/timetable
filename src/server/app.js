const isProduction = process.env.NODE_ENV === 'production';

/** Environment variables */
require('dotenv').config({
  path: !isProduction
    ? `${__dirname}/../../.env.local`
    : `${__dirname}/../../.env`,
});

const router = require('./api/v1');
const initializingApp = require('./config/initializeApp');

const app = initializingApp(router);

const { PORT } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at port ${PORT}`);
});
