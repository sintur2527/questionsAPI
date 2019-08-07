const db = require('../db');

module.exports = {
  questions: {
    get: (product_id, page = 1, count = 5) => {
      return db
        .any(
          'SELECT question_id, question_body, question_date, asker_name, asker_email, question_helpfulness, reported FROM questions WHERE product_id = $1 AND reported = 0 LIMIT $3 OFFSET $3 * ($2 - 1)',
          [product_id, page, count]
        )
        .then(data => {
          return Promise.all(
            data.map(question => {
              question.answers = {};
              return db
                .any(
                  'SELECT id, body, date, answerer_name, answerer_email, helpfulness, photos FROM answers where question_id = $1 AND reported = 0',
                  [question.question_id]
                )
                .then(answers => {
                  answers.forEach(answer => {
                    question.answers[answer.id] = answer;
                  });
                  return question;
                })
                .catch(err => {
                  console.error(err);
                });
            })
          );
        })
        .catch(err => {
          console.error(err);
        });
    },
    post: product_id => {
      return db.none(
        'INSERT INTO questions (product_id, question_body, asker_name, asker_email) VALUES $1, $2, $3, $4',
        [product_id, req.body.body, req.body.name, req.body.email]
      );
    },
    helpful: question_id => {
      return db.none(
        'UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = $1',
        [question_id]
      );
    },
    report: question_id => {
      return db.none(
        'UPDATE questions SET reported = reported + 1 WHERE question_id = $1',
        [question_id]
      );
    },
  },
  answers: {
    get: (question_id, page = 1, count = 5) => {
      return db.any(
        'SELECT id, body, date, answerer_name, answerer_email, helpfulness, photos FROM answers WHERE question_id = $1 LIMIT $3 OFFSET $3 * ($2 - 1)',
        [question_id, page, count]
      );
    },
    post: question_id => {
      return db.none();
    },
    helpful: answer_id => {
      return db.none(
        'UPDATE answers SET helpfulness = helpfulness + 1 WHERE id = $1',
        [answer_id]
      );
    },
    report: answer_id => {
      return db.none(
        'UPDATE answers SET reported = reported + 1 WHERE id = $1',
        [answer_id]
      );
    },
  },
};
