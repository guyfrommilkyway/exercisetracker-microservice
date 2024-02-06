const Log = require('../models/Log');

const getLogs = async (userId) => {
	try {
		const logs = await Log.findOne({ username: userId })
			.populate({ path: 'username', transform: (user) => user.username })
			.populate({
				path: 'log',
				transform: (log) => {
					delete log._id;
					delete log.username;

					return log;
				},
			})
			.lean();

		return logs;
	} catch (e) {
		console.log(e);

		return e;
	}
};

const getLog = async (userId) => {
	try {
		const log = await Log.findOne({ username: userId }).lean();

		return log;
	} catch (e) {
		console.log(e);

		return e;
	}
};

const createLog = async (data) => {
	const log = new Log(data);

	await log.save();

	return log;
};

const updateLog = async (userId, data) => {
	try {
		await Log.updateOne({ username: userId }, data);
	} catch (e) {
		console.log(e);

		return e;
	}
};

module.exports = { getLogs, getLog, createLog, updateLog };
