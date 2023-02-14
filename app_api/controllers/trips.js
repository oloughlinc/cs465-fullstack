// controls access to our database via HTML requests and Mongoose
// this is a RESTful API

// ODM layer for MongoDB
const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const User = mongoose.model('users');

// GET: /trips (find all trips)
const tripsList = async (req, res) => {
    Trip
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
const tripByCode = async (req, res) => {
    Trip
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
const tripsAddTrip = async (req, res) => {

    getUser(req, res, (req, res) => {

        Trip // reminder, the mongoose ODM 
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
    });
}

// PUT: /trips/code/{:code} (update a single trip)
const tripsUpdateTrip = async (req, res) => {
    console.log('Called tripsUpdateTrip');
    getUser(req, res, (req, res) => {
        Trip
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
    });
}

// get the user object associated with the token payload for a given request
const getUser = (req, res, callback) => {
    // https://www.npmjs.com/package/express-jwt changed from [req.payload] to [req.auth]
    if (req.auth && req.auth.email) {
        User
            .findOne({ email: req.auth.email })
            .exec((err, user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ "message": "User not found" });
                } else if (err) {
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);
                }
                // callback will be defined in the calling functions
                callback(req, res, user.name);
            });
    } else {
        return res
            .status(404)
            .json({ "message": "User not found" });
    }
};

module.exports = {
    tripsList,
    tripByCode,
    tripsAddTrip,
    tripsUpdateTrip
}