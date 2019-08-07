const router = require('express').Router();
const controller = require('../controllers');

// answer routes
router.get('/qa/:question_id/answers', controller.answers.get);
router.post('/qa/:question_id/answers', controller.answers.post);
router.put('/qa/answer/:answer_id/helpful', controller.answers.helpful);
router.put('/qa/answer/:answer_id/report', controller.answers.report);

// question routes
router.get('/qa/:product_id', controller.questions.get);
router.post('/qa/:product_id', controller.questions.post);
router.put('/qa/question/:question_id/helpful', controller.questions.helpful);
router.put('/qa/question/:question_id/report', controller.questions.report);

module.exports = router;
