const passport = require('passport');

module.exports = app => {

    app.get('/user/auth', (req, res) => {
        console.log(req.body);
        res.send(req.body);
    })

    app.post('/user/register', (req, res) => {
        console.log(req.body);
        
    });
}