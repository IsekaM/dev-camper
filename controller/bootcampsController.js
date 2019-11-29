// Required Modules
const Bootcamp = require('../models/Bootcamp');
const { successResponse, failedResponse } = require('../utils/controllerUtils');

// Controller Object
const bootcampController = {};

bootcampController.get = async (req, res) => {
	try {
		const bootcamp = await Bootcamp.findById(req.params.id);

		if (!bootcamp) {
			return failedResponse(res, 400, 'invalid ID');
		}

		successResponse(res, 200, 'data fetched', bootcamp);
	} catch (err) {
		failedResponse(res, 400, `error finding data ${err}`);
	}
};

bootcampController.getAll = async (req, res) => {
	try {
		const bootcamps = await Bootcamp.find({});
		successResponse(res, 200, 'data fetched', bootcamps);
	} catch (err) {
		failedResponse(res, 400, `error finding data ${err}`);
	}
};

bootcampController.create = async (req, res) => {
	try {
		const bootcamp = await Bootcamp.create(req.body);
		successResponse(res, 201, 'data added', bootcamp);
	} catch (err) {
		failedResponse(res, 400, `error adding data ${err}`);
	}
};

bootcampController.update = async (req, res) => {
	try {
		const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		successResponse(res, 201, 'data updated', bootcamp);
	} catch (err) {
		failedResponse(res, 400, `error updating data ${err}`);
	}
};

bootcampController.delete = async (req, res) => {
	try {
		const bootcamp = await Bootcamp.findOneAndDelete(req.params.id);
		successResponse(res, 204, 'data deleted successfully');
	} catch (err) {
		failedResponse(res, 400, `error deleting data ${err}`);
	}
};

module.exports = bootcampController;
