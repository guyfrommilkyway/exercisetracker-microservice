const express = require('express');

const { getUsers, createUser } = require('../services/User');
const { createExercise } = require('../services/Exercise');
const { getLogs, getLog, createLog, updateLog } = require('../services/Log');

const router = new express.Router();

router
	.route('/api/users')
	.get(async (req, res) => {
		try {
			const users = await getUsers();

			res.status(200).json(users);
		} catch (e) {
			console.log(e);

			res.status(400).json({ message: e.message || 'Error. Try again later.' });
		}
	})
	.post(async (req, res) => {
		try {
			const { username } = req.body;

			if (!username) throw new Error('Username cannot be empty.');

			const user = await createUser(username);

			res.status(200).json(user);
		} catch (e) {
			console.log(e);

			res.status(400).json({ message: e.message || 'Error. Try again later.' });
		}
	});

router.post('/api/users/:userId/exercises', async (req, res) => {
	try {
		const { description, duration, date } = req.body;
		const { userId } = req.params;

		if (!description || !duration || !userId)
			throw new Error('Missing fields.');

		const exercise = await createExercise(userId, description, duration, date);
		const log = await getLog(userId);

		log
			? await updateLog(userId, {
					count: log.count + 1,
					log: [...log.log, exercise._id],
			  })
			: await createLog({
					username: userId,
					count: 1,
					log: [exercise._id],
			  });

		res.status(200).json(exercise);
	} catch (e) {
		console.log(e);

		res.status(400).json({ message: e.message || 'Error. Try again later.' });
	}
});

router.get('/api/users/:userId/logs', async (req, res) => {
	try {
		const { userId } = req.params;

		if (!userId) throw new Error('Provide a user');

		const logs = await getLogs(userId);

		res.status(200).json(logs);
	} catch (e) {
		console.log(e);

		res.status(400).json({ message: e.message || 'Error. Try again later.' });
	}
});

module.exports = router;
