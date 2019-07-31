const models = require('../models');

module.exports = {
  questions: {
    get: (req, res) => {
      models.questions
        .get()
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    },
  },
};
