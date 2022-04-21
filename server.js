const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const morgan = require('morgan');


const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});


mongoose
    .connect(
        process.env.CONNECTION_URL
    )
    .then(() => {
        app.listen(process.env.PORT || 8000);

    })
    .catch(err => {

    });