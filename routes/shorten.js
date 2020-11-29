const {Router} = require('express');
const shortenController = require('../controllers/shorten');

const router = Router();



router.post('/post', shortenController.post);
router.get('/:uId', shortenController.get);


module.exports = router;
