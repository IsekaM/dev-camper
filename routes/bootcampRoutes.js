// Required Modules
const express = require('express');
const bootCampController = require('../controller/bootcampsController');

// Include Courses Route
const courseRouter = require('./coursesRoute');

// Defining router
const router = express.Router();

// Mount Course Route
router.use('/:bootcampId/courses', courseRouter);

// Mounting Routes
router
	.route('/')
	.post(bootCampController.create)
	.get(bootCampController.getAll);

router
	.route('/:id')
	.delete(bootCampController.delete)
	.get(bootCampController.get)
	.put(bootCampController.update);

router.route('/radius/:zipcode/:distance').get(bootCampController.getAllInRadius);

module.exports = router;
