const models = require('../models');

module.exports = {
  questions: {
    get: (req, res) => {
      models.questions
        .get(req.params.product_id)
        .then(data => {
          let question_data = {
            product_id: req.params.product_id,
            results: data,
          };

          res.status(200).send(question_data);
        })
        .catch(err => {
          console.error(err);
          res.status(500);
        });
    },
  },
  answers: {
    get: (req, res) => {
      console.time('get answers');
      models.answers
        .get(req.params.question_id)
        .then(data => {
          res.status(200).send(data);
          console.timeEnd('get answers');
        })
        .catch(err => {
          res.status(500).send(err);
        });
    },
  },
};
