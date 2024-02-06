const Log = require('../models/Log');

const getLogs = async (userId, from, to, limit) => {
	const isValidFrom = (date) => date >= new Date(from);
	const isValidTo = (date) => date <= new Date(to);

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

		if (limit) logs.log = logs.log.slice(0, limit);

		switch (Boolean(from).toString() + Boolean(to).toString()) {
			case 'truetrue':
				logs.log = logs.log.filter(
					(log) => isValidFrom(log.date) && isValidTo(log.date)
				);
				break;
			case 'truefalse':
				logs.log = logs.log.filter((log) => isValidFrom(log.date));
				break;
			case 'falsetrue':
				logs.log = logs.log.filter((log) => isValidTo(log.date));
				break;
			default:
			// default
		}

		logs.log = logs.log.map((log) => {
			return { ...log, date: log.date.toDateString() };
		});

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
