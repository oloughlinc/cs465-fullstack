/*
API for authentication calls
*/

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

// POST: create a new user account
const register = (req, res) => {
    // check that all required info is in body
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }

    // fill a new object from request body data
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password); // password hash

    // set the new user in database, reply with unique session token if successful
    user.save((err) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            const token = user.generateJwt();
            res
                .status(200)
                .json({token});
        }
    })
};

// POST: login an existing account
const login = (req, res) => {
    // check that all required info is in body
    if (!req.body.email || !req.body.password) {
        return res
        .status(404)
        .json({"message": "All fields required"});
    }
    // use passport to manage an authentication request
    // we configured what this did in config/passport.js
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res
                .status(404)
                .json(err);
        }
        if (user) {
            const token = user.generateJwt();
            res
                .status(200)
                .json({token});
        } else {
            res
                .status(401)
                .json(info);
        }
    }) (req, res);
};

module.exports = {
    register,
    login,
};