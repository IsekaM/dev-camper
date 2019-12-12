const { failedResponse } = require('../utils/responseUtil');
const ErrorResponse = require('../utils/errorResponse');
const { log } = console;

module.exports = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	// Log for developer
	log(err);
	// log(err.stack);

	// Mongoose bad ObjectId
	if (err.name === 'CastError') {
		const message = `Bootcamp not found with ID of: ${err.value}`;
		error = new ErrorResponse(message, 404);
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = `Duplicate resource found in database`;
		error = new ErrorResponse(message, 400);
	}

	// Mongoose Validation Error
	if (err.name === 'ValidationError') {
		const message =
			Object.values(err.errors).map((val, i) => (i > 0 ? ` ${val.path}` : `${val.path}`)) +
			' fields are required';
		error = new ErrorResponse(message, 400);
	}

	failedResponse(res, error.stausCode || 500, error.message);
};
