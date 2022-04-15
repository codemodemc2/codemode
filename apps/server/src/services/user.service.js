const UserModel = require('@/models/user.model');
const Mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { UserExistsError } = require('@/errors');
const { generateHash } = require('@/helpers/security');

class UserService {
	static async createUser(userData) {
		let user = await UserModel.findOne({ email: Mongoose.sanitizeFilter(userData.email) });
		if (user) throw new UserExistsError;
		const newUser = new UserModel({
			email: userData.email,
			account: {
				type: 0,
				premium_expiration_date: null,
				premium_permanent: false,
				unique_id: uuidv4()
			},
		});
		const hash = await generateHash(userData.password);
		newUser.password = hash;
		await newUser.save();
		return newUser;

	}
}

module.exports = UserService;