// Required Modules
const express = require('express');
const dotenv = require('dotenv');

// App Vars
const app = express();
const { log } = console;

// Reg Vars
const PORT = process.env.PORT || 5000;

dotenv.config();

//Middlewares
app.get('/', (req, res) => res.send('<h1>Hi</h1>'));
app.listen(PORT, () => log('Server started on port: ' + PORT));
