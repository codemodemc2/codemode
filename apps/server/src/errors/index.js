class UserExistsError extends Error {
	constructor (message) {
		super(message);
		this.name = 'UserExistsError';
	}
}

module.exports = { UserExistsError };