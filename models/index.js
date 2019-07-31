const db = require('../db');

module.exports = {
  questions: {
    get: () => {
      return db.any('SELECT * FROM questions WHERE id < 6');
    },
  },
};
