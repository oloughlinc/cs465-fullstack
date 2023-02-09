const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router
    .route('/trips') // register route /api/trips (since /api is the base for this router)
    .get(tripsController.tripsList) // respond to get commands with this controller function
    .post(tripsController.tripsAddTrip)
    ;
router
    //:code specifies this as a variable, it can be anything (except nothing, that counts as a different route)
    .route('/trips/code/:code') 
    .get(tripsController.tripByCode)
    .put(tripsController.tripsUpdateTrip)
    ;

module.exports = router;