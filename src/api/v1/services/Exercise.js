const Exercise = require('../models/Exercise');

const createExercise = async (
	userId,
	description,
	duration,
	date = new Date().toDateString()
) => {
	try {
		const exercise = new Exercise({
			username: userId,
			description,
			duration,
			date: new Date(date).toDateString(),
		});

		await exercise.save();

		return exercise;
	} catch (e) {
		console.log(e);

		return e;
	}
};

module.exports = { createExercise };
