exports.successResponse = (res, statusCode, message, data, pagination) => {
	const body = {
		success: true,
		message: message
	};

	if (pagination) body.pagination = pagination;
	if (data) body.data = data;

	return res.status(statusCode).json(body);
};

exports.failedResponse = (res, statusCode, message) => {
	return res.status(statusCode).json({
		success: false,
		message: message
	});
};
