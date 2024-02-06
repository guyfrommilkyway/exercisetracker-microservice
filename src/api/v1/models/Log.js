const { Schema, model } = require('mongoose');

const LogSchema = new Schema({
	username: { type: Schema.Types.ObjectId, ref: 'User' },
	count: { type: Number, required: true },
	log: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Exercise',
		},
	],
});

const Log = model('Log', LogSchema);

module.exports = Log;
