exports.successResponse = (res, status, message, data, pagination) => {
	const body = {
		success: true,
		message: message
	};

	if (pagination) body.pagination = pagination;
	if (data) body.data = data;

	return res.status(status).json(body);
};

exports.failedResponse = (res, status, message) => {
	return res.status(status).json({
		success: false,
		message: message
	});
};
