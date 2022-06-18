const mongoose = require('mongoose');

const User = require('./user');
const Contact = require('./contact')

const url = process.env.DB_URI;

console.log('start connecting to', url);

mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

const models = { User, Contact };

module.exports = models;
