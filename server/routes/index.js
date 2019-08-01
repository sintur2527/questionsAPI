const controller = require('../controllers');
const router = require('express').Router();

router.get('/questions', controller.questions.get);
router.get('/answers', controller.answers.get);
router.get('/photos', controller.photos.get);

module.exports = router;
