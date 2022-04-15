const bcrypt = require('bcrypt');
const crypto = require('crypto');

const saltRounds = 10;

exports.generateHash = (plainPassword, rounds = saltRounds) => {
	return new Promise((resolve, reject) => {
		try {
			console.log(plainPassword, rounds);
			const hash = bcrypt.hash(plainPassword, rounds);
			setTimeout(() => resolve(hash), crypto.randomInt(0, 100));
		} catch (error) {
			setTimeout(() => reject(error), crypto.randomInt(0, 100));
		}
	});
};

exports.checkUser = (password, hash) => {
	return new Promise((resolve, reject) => {
		try {
			const match = bcrypt.compare(password, hash);
			setTimeout(() => resolve(match), crypto.randomInt(0, 100));
		} catch (error) {
			setTimeout(() => reject(error), crypto.randomInt(0, 100));
		}
	});
};
