// Required Modules
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Router Middleware
const bootcamps = require('./routes/bootcamps');

// App Vars
const app = express();
const PORT = process.env.PORT || 5000;
const DBPASS = process.env.DATABASE_PASSWORD;
const DB = process.env.DATABASE.replace('<password>', DBPASS);

const { log } = console;

// App Functions
const serverStarted = () => log(`Server started on port: ${PORT}`);

// Middlewares
app.use(morgan('short'));
app.use('/api/v1/bootcamps', bootcamps);

// Opening Server to the World :)
app.listen(PORT, serverStarted);
