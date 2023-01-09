var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main'); // import controller module

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); 
router.get takes a route: '/' is home location (no route) and a function, in this case, render index.html
this is controller logic (deciding a view based on request), so it is moved to another location, and now we reference the function from there
*/
router.get('/', ctrlMain.index);

module.exports = router;
