const db = require('../db');

module.exports = {
  questions: {
    get: () => {
      return db.any('SELECT * FROM questions WHERE id < 6');
    },
  },
  answers: {
    get: () => {
      return db.any('SELECT * FROM answers WHERE id < 6');
    },
  },
  photos: {
    get: () => {
      return db.any('SELECT * FROM photos WHERE id < 6');
    },
  },
};
