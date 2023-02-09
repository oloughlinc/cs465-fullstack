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
 *                  description: Query completed (even if nothing found), returns JSON trip data in an array.
 *              404:
 *                  description: No response from the database or an error occurred. Returns JSON error message.
 */
const tripsList = async (req, res) => {
    model
        .find({}) // command find all
        .exec((err, trips) => { // execute the given command on DB, perform the following function:
            if (!trips) { // trips == null
                return res
                    .status(404)
                    .json({"message": "No response from the database!"});
            } else if (err) { // error not null, there is an error
                return res
                    .status(404)
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
 *                  description: Query completed (even if nothing found), returns JSON trip data
 *              404:
 *                  description: No response from the database or an error occurred. Returns JSON error message.
 */
const tripByCode = async (req, res) => {
    model
        .find({'code' : req.params.code})
        .exec((err, trip) => {
            if (!trip) { 
                return res
                    .status(404)
                    .json({"message": "No response from the database!"});
            } else if (err) { 
                return res
                    .status(404) 
                    .json(err);
            } else { 
                return res
                    .status(200)
                    .json(trip.at(0));
            }
        });
};

// POST: /trips (add a trip)
/**
 * @swagger
 * /api/trips:
 *      post:
 *          description: Create a new trip on the database.
 * 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              code:
 *                                  type: string
 *                                  description: The unique identification code of this trip.
 *                                  example: BBY2023281111
 *                              name:
 *                                  type: string
 *                                  description: The name of this trip.
 *                                  example: Bombaby Bay
 *                              length:
 *                                  type: string
 *                                  description: The length of this trip, X nights / Y days,
 *                                  example: 6 nights / 7 days        
 *                              start:
 *                                  type: string
 *                                  description: The starting date of this trip in standard time format. 
 *                                  example: 2023-02-08T08:00:00Z
 *                              resort:
 *                                  type: string
 *                                  description: The name of the resort included in this trip.
 *                                  example: The Grand Bombaby, 5 stars
 *                              perPerson:
 *                                  type: string
 *                                  description: The price per person.
 *                                  example: 2398.99
 *                              image:
 *                                  type: string
 *                                  description: Link to the image associated with this trip.
 *                                  example: reef4.jpg
 *                              description:
 *                                  type: string
 *                                  description: HTML formatted description text for this trip.
 *                                  example: <p>Fun in the sun!</p>
 *          responses:
 *              201:
 *                  description: Trip was successfully created, returns JSON data of trip added (mirrors back).
 *              400:
 *                  description: Bad request or invalid content, returns JSON error data.
 */
const tripsAddTrip = async (req, res) => {
    model // reminder, the mongoose ODM 
    .create({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    },
    (err, trip) => { // on create callback
        if (err) {
            return res
                .status(400) // bad request, invalid content
                .json(err); // returning error message as json
        } else {
            return res
                .status(201) // created!
                .json(trip); // mirroring data back in response
        }
    });
}

// PUT: /trips/code/{:code} (update a single trip)
/**
 * @swagger
 * /api/trips/code/{code}:
 *      put:
 *          description: Update a single trip on the database referenced by unique identifier code.
 *          parameters:
 *              - name: code
 *                in: path
 *                description: A unique ID code for a trip
 *                required: true
 *                type: string
 *                example: BBY2023281111
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              code:
 *                                  type: string
 *                                  description: The unique identification code of this trip.
 *                                  example: BBY2023281111
 *                              name:
 *                                  type: string
 *                                  description: The name of this trip.
 *                                  example: Bombaby Bay
 *                              length:
 *                                  type: string
 *                                  description: The length of this trip, X nights / Y days,
 *                                  example: 6 nights / 7 days        
 *                              start:
 *                                  type: string
 *                                  description: The starting date of this trip in standard time format. 
 *                                  example: 2023-02-08T08:00:00Z
 *                              resort:
 *                                  type: string
 *                                  description: The name of the resort included in this trip.
 *                                  example: The Grand Bombaby, 5 stars
 *                              perPerson:
 *                                  type: string
 *                                  description: The price per person.
 *                                  example: 2398.99
 *                              image:
 *                                  type: string
 *                                  description: Link to the image associated with this trip.
 *                                  example: reef4.jpg
 *                              description:
 *                                  type: string
 *                                  description: HTML formatted description text for this trip.
 *                                  example: <p>Fun in the sun!</p>
 *          responses:
 *              204:
 *                  description: Trip was successfully updated, returns JSON data of trip updated.
 *              404:
 *                  description: Trip not found or invalid update content, returns JSON error message.
 *              500:
 *                  description: An internal server error occured, returns JSON error message.
 */
const tripsUpdateTrip = async (req, res) => {
    //console.log(req.body);
    model
    .findOneAndUpdate({'code': req.params.code}, {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    }, { new: true })
    .then(trip => {
        if (!trip) {
            return res
                .status(404)
                .send({
                    message: "Trip not found with code " + req.params.code
                });
        }
        res.status(204).send(trip); // ALL OK
    })
    .catch(err => {
        if (err.kind === 'ObjectId') {
            return res
                .status(404)
                .send({
                    message: "Trip not found with code " + req.params.code
                });
        }
        return res
            .status(500) // SERVER ERROR
            .json(err);
    });
}

module.exports = {
    tripsList,
    tripByCode,
    tripsAddTrip,
    tripsUpdateTrip
}