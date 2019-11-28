const express = require('express');
const bootCampController = require('../controller/bootcamps');
const router = express.Router();

router
	.route('/')
	.get(bootCampController.getAll)
	.post(bootCampController.create);

router
	.route('/:id')
	.get(bootCampController.getAll)
	.put(bootCampController.update)
	.delete(bootCampController.delete);

module.exports = router;
