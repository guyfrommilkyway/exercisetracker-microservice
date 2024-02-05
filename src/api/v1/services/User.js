const User = require('../models/User');

const getUsers = async () => {
	try {
		const users = await User.find({});

		return users;
	} catch (e) {
		console.log(e);

		return e;
	}
};

const createUser = async (username) => {
	try {
		const user = new User({
			username,
		});

		await user.save();

		return user;
	} catch (e) {
		console.log(e);

		return e;
	}
};

module.exports = { getUsers, createUser };
