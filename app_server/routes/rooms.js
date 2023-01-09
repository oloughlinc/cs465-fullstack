var express = require('express');
var router = express.Router();
const controller = require('../controllers/rooms'); // import controller module

router.get('/', controller.rooms);

module.exports = router;