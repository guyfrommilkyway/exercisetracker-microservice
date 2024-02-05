const express = require('express');

const { getUsers, createUser } = require('../services/User');

const router = new express.Router();

router
	.route('/api/users')
	.get(async (req, res) => {
		try {
			const users = await getUsers();

			res.status(200).json(users);
		} catch (e) {
			console.log(e);

			res
				.status(400)
				.json({ message: e.message || 'An error occurred. Try again later.' });
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

			res
				.status(400)
				.json({ message: e.message || 'An error occurred. Try again later.' });
		}
	});

module.exports = router;
