// Required Modules
const asyncHandler = require('../middlewares/asyncHandler');
const geocoder = require('../utils/geocoder');
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
	let queryStr = JSON.stringify(req.query);
	queryStr = queryStr.replace(/\b(lt|gt|lte|gte|in)\b/g, match => `$${match}`);
	queryStr = JSON.parse(queryStr);
	console.log(queryStr);
	const query = Bootcamp.find(queryStr);
	const bootcamps = await query;
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

bootcampController.getAllInRadius = asyncHandler(async (req, res, next) => {
	const { zipcode, distance } = req.params;

	// Get latitude and logitude from geocoder
	const loc = await geocoder.geocode(zipcode);
	const location = loc[0];
	const lat = location.latitude;
	const lng = location.longitude;

	// Calculate radius using radians
	// Divide distance by radius of Earth (3,963 mi/6,378.1 km)
	const radius = distance / 3963;

	const bootcamps = await Bootcamp.find({
		location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
	});

	successResponse(res, 200, 'data found', bootcamps);
});

module.exports = bootcampController;
