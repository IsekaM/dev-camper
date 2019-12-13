// Required Modules
require('dotenv').config();

const { promises: fs } = require('fs');
const path = require('path');
const Bootcamp = require('./models/Bootcamp');
const connectDB = require('./utils/');

// Connect to database
connectDB();

// Helper function to read file
async function readFile(fileName) {
	try {
		const file = await fs.readFile(fileName);
		return file;
	} catch (e) {
		log(e);
	}
}

// Helper function to add data to database
async function addToursToDB(data) {
	try {
		await Bootcamp.deleteMany();
		await Bootcamp.create(data);
		log('Tours migrated successfully 😊');
	} catch (e) {
		log(e);
	}
}

(async () => {
	try {
		log('Script started...');
		let data = await readFile(path.resolve(__dirname, '_data', 'bootcamps.json'));
		data = JSON.parse(data);
		log(data);
		await addToursToDB(data);
	} catch (e) {
		log(e);
	}

	process.exit();
})();
