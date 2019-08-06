const models = require('../models');

module.exports = {
  questions: {
    get: (req, res) => {
      models.questions
        .get(req.params.product_id)
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => {
          res.status(500).send(err);
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
