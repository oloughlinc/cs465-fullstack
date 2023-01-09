var express = require('express');
var router = express.Router();
const controller = require('../controllers/about'); // import controller module

router.get('/', controller.about);

module.exports = router;