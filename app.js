// Required Modules
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Router Middleware
const bootcamps = require('./routes/bootcamps');

// App Vars
const app = express();
const { log } = console;
const DBPASS = process.env.DATABASE_PASSWORD;
const DB = process.env.DATABASE.replace('<password>', DBPASS);
const PORT = process.env.PORT || 5000;

// App Functions
const serverStarted = () => log(`Server started on port: ${PORT}`);

// Database Connection
mongoose
	.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(con => log(`Database successfully connected to host: ${con.connection.host}`))
	.catch(err => log(err));

// Middlewares
app.use(morgan('short'));
app.use('/api/v1/bootcamps', bootcamps);

// Opening Server to the World :)
app.listen(PORT, serverStarted);
