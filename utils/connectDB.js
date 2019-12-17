// Required Modules
const mongoose = require('mongoose');

// App Vars
const DBPASS = process.env.DATABASE_PASSWORD;
const DB = process.env.DATABASE.replace('<password>', DBPASS);
const { log } = console;

// Database Connection Function
async function connectDB() {
	try {
		const db = await mongoose.connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});

		log(`Database successfully connected to host: ${db.connection.host}`);
	} catch (error) {
		log(error);
	}
}

module.exports = connectDB;
