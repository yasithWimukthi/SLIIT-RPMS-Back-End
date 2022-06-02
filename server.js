import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/Student";

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


app.use('/auth', authRoutes);
app.use('/api/student', studentRoutes);


app.use((error, req, res) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(
        process.env.CONNECTION_URL
    )
    .then(() => {
        app.listen(process.env.PORT || 8000);
        console.log('Connected to database');
    })
    .catch(err => {
        console.log(err);
    });