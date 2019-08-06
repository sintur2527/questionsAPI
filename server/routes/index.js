const controller = require('../controllers');
const router = require('express').Router();

router.get('/qa/:question_id/answers', controller.answers.get);

router.get('/qa/:product_id', controller.questions.get);

module.exports = router;
