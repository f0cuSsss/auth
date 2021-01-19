const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('google_users');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((_id, done) => {
    User.findOne({ _id })
        .then(user => done(null, user));
});

passport.use(new GoogleStategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if(!existingUser) {
                new User({ googleId: profile.id, firstName: '', secondName: '', dob: null })
                    .save()
                    .then(user => done(null, user));
            }
            else {
                done(null, existingUser);
            }
        });
}));
