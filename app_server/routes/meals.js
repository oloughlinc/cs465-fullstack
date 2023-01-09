var express = require('express');
var router = express.Router();
const controller = require('../controllers/meals'); // import controller module

router.get('/', controller.meals);

module.exports = router;