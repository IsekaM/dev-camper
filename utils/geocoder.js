// Required Modules
// require('dotenv').config();
const NodeGeocoder = require('node-geocoder');

// Geocoder Options
const options = {
	provider: process.env.GEOCODER_PROVIDER,
	httpAdapter: 'https',
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null
};

// Initializing Geocoder
const geocoder = NodeGeocoder(options);

module.exports = geocoder;
