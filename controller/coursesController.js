// Required Modules
const { successResponse } = require('../utils/response');
const asyncHandler = require('../middlewares/asyncHandler');
const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');
const splitQuery = require('../utils/splitQuery');

// Controller Object
const coursesController = {};

// @desc    Get Courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public

coursesController.getAll = asyncHandler(async (req, res, next) => {
	let query;

	if (req.params.bootcampId) {
		query = Course.find({ bootcamp: req.params.bootcampId });
	} else {
		query = Course.find();
	}

	const courses = await query;

	successResponse(res, 200, 'data fetched', courses);
});

module.exports = coursesController;
