const controller = require('../controllers');
const router = require('express').Router();

router.get('/qa/:question_id/answers', controller.answers.get);
router.post('/qa/:question_id/answers');
router.put('/qa/answer/:answer_id/helpful');
router.put('/qa/answer/:answer_id/report');

router.get('/qa/:product_id', controller.questions.get);
router.post('/qa/:product_id');
router.put('/qa/question/:question_id/helpful');
router.put('/qa/question/:question_id/report');

module.exports = router;
