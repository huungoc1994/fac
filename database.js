const config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${config.HOST}:${config.DB_PORT}/${config.DB_NAME}`, {useNewUrlParser: true}, (err) => {
    if (err) console.error(err);
    console.log(`Database connected on port ${config.DB_PORT}`);
});

const Schema = mongoose.Schema;
const userSchema = new Schema({
    'username': String,
    'password': String,
    'email': String,
    'address': String,
    'phone': String,
    'gender': String,
    'company_name': String,
    'FB_uid': String,
    'avatar': String,
    'FB_username': String,
    'FB_birthday': Date,
    'permission': Number
});
const user = mongoose.model('user', userSchema);

const msgSchema = new Schema({
    'parentID': String,
    'content': String,
    'level': String,
    'FB_uid': String,
    'payload': String,
    'type': String,
    'createAt': Date
});
const msg = mongoose.model('msg', msgSchema);

const serviceSchema = new Schema({
    'title': String,
    'img': String,
    'createAt': Date,
    'level': String
});
const service = mongoose.model('service', serviceSchema);
module.exports.users = user;
module.exports.msgs = msg;
module.exports.services = service;
