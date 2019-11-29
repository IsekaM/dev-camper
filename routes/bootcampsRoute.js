const express = require('express');
const bootCampController = require('../controller/bootcampsController');
const router = express.Router();

router
	.route('/')
	.post(bootCampController.create)
	.get(bootCampController.getAll);

router
	.route('/:id')
	.delete(bootCampController.delete)
	.get(bootCampController.get)
	.put(bootCampController.update);

module.exports = router;
