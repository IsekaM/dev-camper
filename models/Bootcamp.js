// Required Modules
const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

// Bootcamp Schema
const BootcampSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A name is required'],
		unique: true,
		trim: true,
		maxlength: [50, 'Name cannot be more than 50 characters long']
	},

	slug: String,

	description: {
		type: String,
		trim: true,
		required: [true, 'A description is required'],
		maxlength: [500, 'Description cannot be more than 50 characters long']
	},

	website: {
		type: String,
		match: [
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
			'Please add valid website'
		]
	},

	phone: {
		type: String,
		maxlength: [20, 'Phone number cannot be longer than 20 characters']
	},

	email: {
		type: String,
		match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]+$/, 'Please add valid email']
	},

	address: {
		type: String,
		required: [true, 'An address is required'],
		trim: true
	},

	location: {
		type: {
			type: String, // Don't do `{ location: { type: String } }`
			enum: ['Point'], // 'location.type' must be 'Point'
			defualt: 'Point'
		},
		coordinates: {
			type: [Number],
			index: '2dsphere'
		},
		formattedAddress: String,
		street: String,
		city: String,
		state: String,
		zipcode: String,
		country: String
	},

	careers: {
		type: [String],
		required: true,
		enum: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other']
	},

	averageRating: {
		type: Number,
		min: [1, 'Rating must be at least 1'],
		max: [10, 'Rating should not be over 10']
	},

	averageCost: Number,

	photo: {
		type: String,
		default: 'no-photo.jpg'
	},

	housing: {
		type: Boolean,
		default: false
	},

	jobAssistance: {
		type: Boolean,
		default: false
	},

	jobGuarantee: {
		type: Boolean,
		default: false
	},

	acceptGi: {
		type: Boolean,
		default: false
	},

	createdAt: {
		type: Date,
		default: Date.now
	}
});

BootcampSchema.pre('save', function(next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

BootcampSchema.pre('save', async function(next) {
	// Geocode and create location field
	const loc = await geocoder.geocode(this.address);
	const location = loc[0];
	console.log(location);
	this.location = {
		type: 'Point',
		coordinates: [location.longitude, location.latitude],
		formattedAddress: location.formattedAddress,
		street: location.streetName,
		city: location.city,
		state: location.stateCode,
		zipcode: location.zipcode,
		country: location.countryCode
	};

	// Don't save address
	this.address = undefined;
	next();
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);
