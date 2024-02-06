const Exercise = require('../models/Exercise');

const getExercise = async (userId) => {
	try {
		const exercise = await Exercise.findOne({ username: userId }).populate({
			path: 'username',
			transform: (user) => user.username,
		});

		return exercise;
	} catch (e) {
		console.log(e);

		return e;
	}
};

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

module.exports = { getExercise, createExercise };
