const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(
    cookieSession({
        // 30 days * 24 hours * 60 min * 60 sec * 1000 ms
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authFacebookRoutes')(app);
require('./routes/authGoogleRoutes')(app);
require('./routes/userApiRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT); 