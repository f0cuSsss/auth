const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const googleUserSchema = new Schema({
    googleId: String,
    firstName: String,
    secondName: String,
    dob: Date
});

mongoose.model('google_users', googleUserSchema);

const facebookUserSchema = new Schema({
    facebookId: String,
    firstName: String,
    secondName: String,
    dob: Date
});

mongoose.model('facebook_users', facebookUserSchema);

const lpUserSchema = new Schema({
    id: String,
    login: String,
    pass_hash: String,
    pass_salt: String,
    firstName: String,
    secondName: String,
    dob: Date
});

lpUserSchema.methods.validPassword = () => {

    return true;
}

mongoose.model('users', lpUserSchema);
