const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
const path = require('path');
// const MongoStore = require('connect-mongo')(session);
const dbConfiguration = require('./db');
/** Database setup */
// const dbConnection = dbConfiguration();
dbConfiguration();

require('../models/Attachment');
require('../models/Board');
require('../models/Category');
require('../models/Comment');
require('../models/Group');
// require('../models/Notification');
require('../models/Project');
require('../models/Role');
require('../models/Status');
require('../models/Subscription');
require('../models/Task');
require('../models/Timer');
require('../models/Todo');
require('../models/User');

module.exports = function initializedApp(router) {
  const isProduction = process.env.NODE_ENV === 'production';

  const app = express();

  /** Middlewares */
  app.use(morgan('tiny'));
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  // app.use(
  //   session({
  //     secret: process.env.SESSION_SECRET,
  //     resave: false,
  //     saveUninitialized: true,
  //     unset: 'destroy',
  //     cookie: {
  //       maxAge: 24 * 60 * 60 * 1000,
  //       secure: app.get('env') === 'production',
  //     },
  //     store: new MongoStore({
  //       mongooseConnection: dbConnection,
  //       touchAfter: 24 * 3600,
  //       clear_interval: 3600 * 2,
  //     }),
  //   })
  // );

  app.use(
    cors({
      origin: isProduction ? 'https://asteyo.com' : '*',
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
    })
  );

  app.use('/api/static', express.static(path.join(__dirname, '../uploads/')));

  /** API endpoints */
  app.use('/api/v1', router);

  // Avoiding favicon returning 404
  app.get('/favicon.ico', (req, res) => res.status(204));

  // Handling unreachable routes
  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });

  // error handler middleware
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: 'Internal Server Error',
      errors: { details: error.message },
    });
  });

  return app;
};
