const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
const UserGoogle = mongoose.model('google_users');
const UserFacebook = mongoose.model('facebook_users');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (_id, done) => {
    const googleUser = await UserGoogle.findOne({ _id });
    if(googleUser){
        return done(null, googleUser)
    }

    const facebookUser = await UserFacebook.findOne({ _id });
    if(facebookUser){
        return done(null, facebookUser)
    }
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await UserGoogle.findOne({ googleId: profile.id });

    if(existingUser) {
        return done(null, existingUser);
    }

    const user = await new UserGoogle({ googleId: profile.id, firstName: '', secondName: '', dob: null }).save();
    done(null, user);
}));

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback'
  }, async (accessToken, refreshToken, profile, done) => {
        const existingUser = await UserFacebook.findOne({ facebookId: profile.id });

        if(existingUser) {
            return done(null, existingUser);
        }

        const user = await new UserFacebook({ facebookId: profile.id, firstName: '', secondName: '', dob: null }).save();
        done(null, user);
  }
));

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
  }, async (username, password, done) => {
        const user = await User.findOne({ login: username });

        if (!user) {
            return done(null, false, { message: 'Incorrect login' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
}));