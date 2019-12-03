// Required Modules
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponseUtil');
const { successResponse, failedResponse } = require('../utils/responseUtil');

// Controller Object
const bootcampController = {};

bootcampController.get = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findById(req.params.id);

		if (!bootcamp) {
			return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404));
		}

		successResponse(res, 200, 'data fetched', bootcamp);
	} catch (err) {
		next(err);
		// next(new ErrorResponse(`bootcamp not found with ID of: ${req.params.id}`, 404));
		// failedResponse(res, 400, `error finding data ${err}`);
	}
};

bootcampController.getAll = async (req, res, next) => {
	try {
		const bootcamps = await Bootcamp.find({});
		successResponse(res, 200, 'data fetched', bootcamps);
	} catch (err) {
		next(err);
		// failedResponse(res, 400, `error finding data ${err}`);
	}
};

bootcampController.create = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.create(req.body);
		successResponse(res, 201, 'data added', bootcamp);
	} catch (err) {
		next(err);
		// failedResponse(res, 400, `error adding data ${err}`);
	}
};

bootcampController.update = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		successResponse(res, 201, 'data updated', bootcamp);
	} catch (err) {
		next(err);
		// failedResponse(res, 400, `error updating data ${err}`);
	}
};

bootcampController.delete = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findOneAndDelete(req.params.id);
		successResponse(res, 204, 'data deleted successfully');
	} catch (err) {
		next(err);
		// failedResponse(res, 400, `error deleting data ${err}`);
	}
};

module.exports = bootcampController;
