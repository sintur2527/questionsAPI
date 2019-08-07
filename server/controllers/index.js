const models = require('../models');

module.exports = {
  questions: {
    get: (req, res) => {
      const { product_id } = req.params;
      const { page, count } = req.query;
      console.time('get questions');
      models.questions
        .get(product_id, page, count)
        .then(data => {
          let question_data = {
            product_id: product_id,
            results: data,
          };
          res.status(200).send(question_data);
          console.timeEnd('get questions');
        })
        .catch(err => {
          console.error(err);
          res.status(500);
        });
    },
  },
  answers: {
    get: (req, res) => {
      const { question_id } = req.params;
      const { page, count } = req.query;
      console.time('get answers');
      models.answers
        .get(question_id, page, count)
        .then(data => {
          let answer_data = {
            question: question_id,
            page: parseInt(page) || 1,
            count: parseInt(count) || 5,
            results: data,
          };
          res.status(200).send(answer_data);
          console.timeEnd('get answers');
        })
        .catch(err => {
          res.status(500).send(err);
        });
    },
  },
};
