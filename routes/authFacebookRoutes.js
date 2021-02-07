const passport = require('passport');

module.exports = app => {
    app.get('/auth/facebook', 
        passport.authenticate('facebook', 
        { scope: ['profile', 'email'] 
    }));

    app.get('/auth/facebook/callback', 
        passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
            res.redirect('/');
        });
}