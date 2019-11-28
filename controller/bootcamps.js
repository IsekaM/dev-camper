const bootcampController = {};

bootcampController.get = (req, res) => {
	res.status(200).json({
		message: 'Success',
		data: {}
	});
};

bootcampController.getAll = (req, res) => {
	res.status(200).json({
		message: 'Success',
		data: {}
	});
};

bootcampController.create = (req, res) => {};

bootcampController.update = (req, res) => {};

bootcampController.delete = (req, res) => {};

module.exports = bootcampController;
