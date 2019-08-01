const keys = require('../keys');
const pgp = require('pg-promise')(/*options*/);

const config = {
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
};

const db = pgp(config);

module.exports = db;
