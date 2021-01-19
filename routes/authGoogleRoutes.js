const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }));

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send("<h1>You did logout</h1>");
    });

    app.get('/api/current_user', (req, res) => {
        if(req.user){
            res.send(req.user);
        } else {
            res.send("<h1>You need to sign in</h1>");
        }
    });
}