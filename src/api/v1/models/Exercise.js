const { Schema, model } = require('mongoose');

const ExerciseSchema = new Schema({
	username: { type: Schema.Types.ObjectId, ref: 'User' },
	description: { type: String, required: true },
	duration: { type: Number, required: true },
	date: { type: Date, required: true },
});

const Exercise = model('Exercise', ExerciseSchema);

module.exports = Exercise;
