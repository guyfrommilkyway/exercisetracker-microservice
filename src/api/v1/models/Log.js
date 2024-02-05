const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
	username: { type: String, required: true },
	count: { type: Number, required: true },
	log: [
		{
			description: { type: String, required: true },
			duration: { type: Number, required: true },
			date: { type: Date, required: true },
		},
	],
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
