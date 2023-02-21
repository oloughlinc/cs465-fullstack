/*
Passport makes it easy to use authentication strategies
In this case a new 'Local' strategy is prepared for use
It is local becuase we keep the auth data on our database
*/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

// register a single call to passport to register a new strategy and what to do
passport.use(new LocalStrategy({
    usernameField: 'email'
}, 
     // verification function
    (username, password, done) => {
        // search the database for a unique username (email)
        User.findOne({ email: username }, 

            // callback on search return
            (err, user) => {

                if (err) { return done(err); }

                if (!user || !user.validPassword(password)) {
                    return done(null, false, { message: 'Invalid Credentials'});
                }
                return done(null, user); // if all is good, return the single user object
            }); 
    }
));