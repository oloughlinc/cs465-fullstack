/*
User database model. Store user credentials and a salted password.
Contains methods to validate password and create a new unique web token for
an authenticated user
*/
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// This schema defines how each individual user document must look
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    hash: String,
    salt: String
});

/* methods can be added to a schema before modeling
    this is important and powerful, letting our data models act as objects
*/

// set a password for a user using good security practices
userSchema.methods.setPassword = function(password) {
    // salting ensures that even duplicate passwords will not look the same on our database
    // making things more secure against hacker types
    this.salt = crypto.randomBytes(16).toString('hex'); 
    // no plain text passwords are stored - repeatable one-way hash only
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// take the input password, hash it, and compare against stored hash
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    // === compares content and type (no conversions)
    return this.hash === hash;
};

// build a new JWT for a valid response
userSchema.methods.generateJwt = function() {

    // all tokens should expire
    // this one picks one week from now
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        // payload of token
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000, 10) // as set expiration time in seconds from epoch
        // secret. this ensure we know valid tokens from fake ones
    }, process.env.JWT_SECRET); 
};

// compile the model
mongoose.model('users', userSchema);