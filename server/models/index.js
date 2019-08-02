const db = require('../db');

module.exports = {
  questions: {
    get: product_id => {
      return db.any('SELECT * FROM questions WHERE product_id = $1', [
        product_id,
      ]);
    },
  },
  answers: {
    get: question_id => {
      return db.query(
        'SELECT answers.*, ARRAY_AGG(url) photos FROM answers LEFT JOIN photos ON answers.id = photos.answer_id WHERE answers.question_id = $1 GROUP BY answers.id',
        [question_id]
      );
    },
  },
  photos: {
    get: answer_id => {
      return db.any('SELECT (id, url) FROM photos WHERE answer_id = $1', [
        answer_id,
      ]);
    },
  },
};
