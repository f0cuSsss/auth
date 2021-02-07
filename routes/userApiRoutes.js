const passport = require('passport');
const mongoose = require('mongoose');
const Users = mongoose.model('google_users');

module.exports = (app) => {
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/')
    });

    app.get('/api/check_auth', (req, res) => {
        res.send(req.user);
    });

    app.get('/api/profile/:id', async (req, res) => {
        const _id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(_id)){
            res.send({ error: 'User not found' });
            return;
        }
        
        const user = await Users.findOne({ _id });
        if(user) {
            res.send(user);
        } else {
            res.send({ error: 'User not found' });
        }

    });
}