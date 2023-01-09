var express = require('express');
var router = express.Router();
const controller = require('../controllers/news'); // import controller module

router.get('/', controller.news);

module.exports = router;