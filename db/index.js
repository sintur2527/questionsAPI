const pgp = require('pg-promise')(/*options*/);
const db = pgp('postgres://soumithinturi:zxcv@localhost:5432/questions');

module.exports = db;
