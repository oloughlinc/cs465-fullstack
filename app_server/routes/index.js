var express = require('express');
const router = express.Router();

// import controller modules
const homeController = require('../controllers/home'); 
const aboutController = require('../controllers/about');
const contactController = require('../controllers/contact');
const mealsController = require('../controllers/meals');
const newsController = require('../controllers/news');
const roomsController = require('../controllers/rooms');
const travelController = require('../controllers/travel');

router
  .route('/')
  .get(homeController.index);

router
  .route('/about')
  .get(aboutController.about);

router
  .route('/contact')
  .get(contactController.contact);

router
  .route('/meals')
  .get(mealsController.meals)

router
  .route('/news')
  .get(newsController.news)

router
  .route('/rooms')
  .get(roomsController.rooms)

router
  .route('/travel')
  .get(travelController.getTravelList);

module.exports = router;
