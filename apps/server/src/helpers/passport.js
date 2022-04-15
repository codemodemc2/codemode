const User = require('@/models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const { checkUser } = require('./security.js');
const Mongoose = require('mongoose');

const { UserService } = require('@/services');

module.exports = (passport) => {
	passport.use('local-signin',
		new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
			try {
				let user = await User.findOne({ email: Mongoose.sanitizeFilter(email) });
				if (!user) return done(false, false, { message: 'wrong_username_or_password', status: 401 });

				let match = await checkUser(password, user.password);
				if (!match) return done(false, false, { message: 'wrong_username_or_password', status: 401 });

				return done(null, user);
			} catch (error) {
				console.log(error);
				return done({ message: 'something_went_wrong', status: 500 }, false);
			}
		})
	);

	passport.use('local-signup',
		new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
			try {
				console.log(UserService);
				let user = await UserService.createUser({ email, password });
				console.log(user, "USER");
				return done(null, user);

			} catch (error) {
				console.log(error, "ERROR");
				if (error.name == 'UserExistsError') return done(false, false, { message: 'user_with_that_mail_already_exists', status: 403 });
				else return done({ message: 'something_went_wrong', status: 500 }, false);
			}
		}));

	passport.serializeUser((user, done) => {
		done(null, String(user._id));
	});
	passport.deserializeUser((_id, done) => {
		User.findById(Mongoose.Types.ObjectId(_id), (err, user) => {
			done(err, user);
		});
	});
};