const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router = express.Router();
dotenv.config();

// database connection
mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('connection established.');
    })
    .catch((err) => {
        console.log('connection error: ', err);
    });

// Routes
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courseRoutes');

app.use(express.json());
app.use((req, res, next) => {
    console.log('common:', req.body);
    console.log(req.url);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
});
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log('server is running on port: ', process.env.PORT);
});
