// Required Modules
require('dotenv').config();

const { readFileSync: readFile } = require('fs');
const path = require('path');
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const connectDB = require('./utils/connectDB');

// Functions
const { exit } = process;

// Connect to database
connectDB();

async function addToDb() {
	let bootcamps = readFile(path.join(__dirname, '_data', 'bootcamps.json'), 'utf-8');
	let courses = readFile(path.join(__dirname, '_data', 'courses.json'), 'utf-8');

	//
	[bootcamps, courses] = [JSON.parse(bootcamps), JSON.parse(courses)];

	console.log(bootcamps);

	try {
		await Bootcamp.create(bootcamps);
		await Course.create(courses);
	} catch (error) {
		console.error(error);
	}

	exit();
}

async function deleteFromDb() {
	try {
		Bootcamp.deleteMany();
		Course.deleteMany();
	} catch (error) {
		console.error(error);
	}

	exit();
}

(() => {
	const arg = process.argv[2];
	// console.log(arg);

	if (arg === '-d' || arg === '--delete') {
		console.log('Deleted data from database(s) successfully');
		return deleteFromDb();
	}

	if (arg === '-a' || arg === '--add') {
		console.log('Added data to database(s) successfully');
		return addToDb();
	}

	console.error('Wrong argument passed');
	return exit();
})();
