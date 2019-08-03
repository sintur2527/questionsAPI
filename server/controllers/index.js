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
      models.answers
        .get(req.params.id)
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    },
  },
};
