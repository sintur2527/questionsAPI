const db = require('../db');

module.exports = {
  questions: {
    get: product_id => {
      return db
        .any(
          'SELECT question_id, question_body, question_date, asker_name, asker_email, question_helpfulness, reported FROM questions WHERE product_id = $1',
          [product_id]
        )
        .then(data => {
          return Promise.all(
            data.map(question => {
              question.answers = {};
              return db
                .any(
                  'SELECT id, body, date, answerer_name, answerer_email, helpfulness, reported, photos FROM answers where question_id = $1',
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
        'INSERT INTO questions (product_id, body, asker_name, asker_email) VALUES $1, $2, $3, $4',
        [product_id, req.body.body, req.body.name, req.body.email]
      );
    },
    helpful: question_id => {
      return db.none(
        'UPDATE questions SET helpful = helpful + 1 WHERE id = $1',
        [question_id]
      );
    },
    report: question_id => {
      return db.none(
        'UPDATE questions SET reported = reported + 1 WHERE id = $1',
        [question_id]
      );
    },
  },
  answers: {
    get: question_id => {
      return db
        .any('SELECT * FROM answers WHERE question_id = $1', [question_id])
        .then(data => {
          return Promise.all(
            data.map(answer => {
              answer.photos = [];
              return db
                .any('SELECT url from photos where answer_id = $1', [answer.id])
                .then(photos => {
                  answer.photos = photos;
                  return answer;
                });
            })
          );
        });
    },
    get: question_id => {
      return db.any('SELECT * FROM answers where question_id = $1', [
        question_id,
      ]);
    },
    post: question_id => {
      return db.none();
    },
    helpful: answer_id => {
      return db.none('UPDATE answers SET helpful = helpful + 1 WHERE id = $1', [
        answer_id,
      ]);
    },
    report: answer_id => {
      return db.none(
        'UPDATE answers SET reported = reported + 1 WHERE id = $1',
        [answer_id]
      );
    },
  },
};
