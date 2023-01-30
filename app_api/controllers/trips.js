// controls access to our database via HTML requests and Mongoose
// this is a RESTful API

// ODM layer for MongoDB
const mongoose = require('mongoose');
const model = mongoose.model('trips');

// GET: /trips (find all trips)
/**
 * @swagger
 * /api/trips:
 *      get:
 *          description: Get all information on all trips stored in the database.
 *          responses:
 *              200:
 *                  description: Query successful, returns JSON trip data
 *              404:
 *                  description: Nothing found, or an error occurred during the query. Returns JSON error message.
 */
const tripsList = async (req, res) => {
    model
        .find({}) // command find all
        .exec((err, trips) => { // execute the given command on DB, perform the following function:
            if (trips.length <= 0) { // !trips wasn't working here, using array length = 0;
                return res
                    .status(404)
                    .json({"message": "No trips found"});
            } else if (err) { // error not null, there is an error
                return res
                    .status(404) // when to use 500?
                    .json(err);
            } else { // otherwise found something
                return res
                    .status(200) // OK
                    .json(trips);
            }
        });
};

// GET /trips/code/:code (find one by code)
/**
 * @swagger
 * /api/trips/code/{code}:
 *      get:
 *          description: Get all details of a single trip by unique identifier code.
 *          parameters:
 *              - name: code
 *                in: path
 *                description: A unique ID code for a trip
 *                required: true
 *                type: string
 *          responses:
 *              200:
 *                  description: Query successful, returns JSON trip data
 *              404:
 *                  description: Nothing found, or an error occurred during the query. Returns JSON error message.
 */
const tripByCode = async (req, res) => {
    model
        .find({'code' : req.params.code})
        .exec((err, trip) => {
            if (trip.length <= 0) { 
                return res
                    .status(404)
                    .json({"message": "No trip found"});
            } else if (err) { 
                return res
                    .status(404) 
                    .json(err);
            } else { 
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

module.exports = {
    tripsList,
    tripByCode
}