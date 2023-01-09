var express = require('express');
var router = express.Router();
const controller = require('../controllers/contact'); // import controller module

router.get('/', controller.contact);

module.exports = router;