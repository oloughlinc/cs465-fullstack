var express = require('express');
var router = express.Router();
const controller = require('../controllers/travel'); // import controller module

router.get('/', controller.travel);

module.exports = router;