const controller = require('../controllers');
const router = require('express').Router();

router.get('/qa/:product_id', controller.questions.get);
router.get('/answers/:id', controller.answers.get);

module.exports = router;
