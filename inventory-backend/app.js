// Basic Lib Import
const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');

// Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')
const hpp = require('hpp');
const cors = require('cors');
require('dotenv').config();

// Database Lib Import
const mongoose = require('mongoose');


// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))

// BodyParser Implement
app.use(bodyParser.json())

// Request Rate Limit
const limiter =  rateLimit({windowMs: 15*60*1000, max: 3000})
app.use(limiter)

// MongoDB Database Connection
let DATABASE = process.env.DB
mongoose.connect(DATABASE,{autoIndex:true}).then((res) =>{
    console.log("Database Connected");
}).catch((err) =>{
    console.log(err)
})

app.set('etag', false);
// Routing Implement
app.use('/api/v1', router);

// // Undefined Route Implement [ Getting Error below this code ]
app.use("*", (req, res) => {
    res.status(404).json({ status: "fail", data: "Incorrect API" });
});


module.exports = app;