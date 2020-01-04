// Required Modules
const express = require('express');
const coursesController = require('../controller/coursesController');

// Defining router
const router = express.Router({ mergeParams: true });

// Mounting Routes
router.route('/').get(coursesController.getAll);

module.exports = router;
