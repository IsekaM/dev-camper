// Required Modules
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const connectDB = require('./utils/connectDB');

// Route Middlewares
const bootcamps = require('./routes/bootcampRoutes');
const courses = require('./routes/coursesRoute');

// Error Handler Middleware
const errorHandler = require('./middlewares/error');

// App Vars
const app = express();
const { log } = console;
const PORT = process.env.PORT || 5000;

// App Functions
const serverStarted = () => log(`Server started on port: ${PORT}`);

// Database Connection
connectDB();

// Middlewares
app.use(morgan('short'));
app.use(express.json());
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use(errorHandler);

// Opening Server to the World :)
app.listen(PORT, serverStarted);
