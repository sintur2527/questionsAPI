const controller = require('../controllers');
const router = require('express').Router();

router.get('/qa/:product_id', controller.questions.get);
router.get('/answers/:id', controller.answers.get);
router.get('/photos', controller.photos.get);

module.exports = router;
