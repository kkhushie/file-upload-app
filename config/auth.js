const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

// Local Strategy for signup and login
passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    User.findOne({ username: username }).then(user => {
        if (user) {
            return done(null, false, req.flash('error_msg', 'Username already exists.'));
        } else {
            // Hash password
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) return done(err);
                const newUser = new User({ username, password: hash });
                newUser.save().then(user => {
                    return done(null, user);
                }).catch(err => {
                    return done(err);
                });
            });
        }
    });
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, (username, password, done) => {
    User.findOne({ username }).then(user => {
        if (!user) {
            return done(null, false, { message: 'No user found.' });
        }
        // Check password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    }).catch(err => {
        return done(err);
    });
}));
