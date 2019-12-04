// Required Modules
const asyncHandler = require('../middlewares/asyncHandler');
const { successResponse } = require('../utils/responseUtil');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponseUtil');

// Controller Object
const bootcampController = {};

bootcampController.get = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);

	if (!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404));
	}

	successResponse(res, 200, 'data fetched', bootcamp);
});

bootcampController.getAll = asyncHandler(async (req, res, next) => {
	const bootcamps = await Bootcamp.find({});
	successResponse(res, 200, 'data fetched', bootcamps);
});

bootcampController.create = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.create(req.body);
	successResponse(res, 201, 'data added', bootcamp);
});

bootcampController.update = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});
	successResponse(res, 201, 'data updated', bootcamp);
});

bootcampController.delete = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findOneAndDelete(req.params.id);
	successResponse(res, 204, 'data deleted successfully');
});

module.exports = bootcampController;
