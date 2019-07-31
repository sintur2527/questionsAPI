const controller = require('../controllers');
const router = require('express').Router();

router.get('/questions', controller.questions.get);

module.exports = router;
