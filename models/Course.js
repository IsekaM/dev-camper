// Required Modules
const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'Please add a course title']
	},

	description: {
		type: String,
		trim: true,
		default: 'No description provided'
	},

	weeks: {
		type: String,
		required: [true, 'Please add number of weeks']
	},

	tuition: {
		type: Number,
		required: [true, 'Please add tuition cost']
	},

	minimumSkill: {
		type: String,
		required: [true, 'Please add a minimum skill (beginner, intermediate or advanced)'],
		enum: ['beginner', 'intermediate', 'advanced']
	},

	scholarshipAvailable: {
		type: Boolean,
		default: false
	},

	createdAt: {
		type: Date,
		default: Date.now
	},

	bootcamp: {
		type: mongoose.Schema.ObjectId,
		ref: 'Bootcamp',
		required: true
	}
});

module.exports = mongoose.model('Course', CoursesSchema);
