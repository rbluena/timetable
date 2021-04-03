const mongoose = require('mongoose');

const isNotProduction = process.env.NODE_ENV !== 'production';
mongoose.set('debug', isNotProduction);

function connectDB() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  const { DB_USER, DB_PASS, DB_NAME, DB_HOST } = process.env;

  options.user = DB_USER;
  options.pass = DB_PASS;
  options.dbName = DB_NAME;

  mongoose.connect(DB_HOST, options);

  const connection = mongoose.connection
    .once('open', () => {
      // eslint-disable-next-line no-console
      console.log('Database connection established!');
    })
    .on('error', (error) => {
      // eslint-disable-next-line no-console
      console.log('Connection error: ', error);
    });

  return connection;
}

module.exports = connectDB;
