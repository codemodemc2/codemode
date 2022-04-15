const { generateHash, checkUser } = require("@/helpers/security");
const passport = require('passport');

exports.userLoginController = async (req, res) => {
	res.send("OK");
};


exports.userRegisterController = async (req, res, next) => {
	const { email, password, password2, username } = req.body;

	if (!email || !password || !password2 || !username) {
		res.status(403).send(JSON.stringify({ message: 'you_didnt_fill_all_fields' }));
		return;
	}

	if (password !== password2) {
		res.status(403).send(JSON.stringify({ message: 'passwords_dont_match' }));
		return;
	}

	if (password.length < 6) {
		res.status(403).send(JSON.stringify({ message: 'password_must_be_at_least_6_chars_long' }));
		return;
	}


	passport.authenticate('local-signup', async (err, user, info) => {
		console.log(err, user, info);
		if (err) return next(err);
		if (info) return next(info);
		if (!user) return res.status(403).send({ message: 'try_again' });

		user.account.last_login_date = Date.now();
		user.account.registration_ip = req.clientIp;
		user.username = username;

		await user.save();

		req.logIn(user, (err) => {
			if (err) {
				console.log(err);
				return next({ message: 'something_went_wrong', status: 500 });
			};
			return res.status(200).send({
				user: {
					session_expires_at: new Date(new Date().setHours(new Date().getHours() + 24)).getTime(),
					data: {
						email: user.email,
						is_admin: user.is_admin,
						username: user.username,
						account: {
							type: user.account.type,
							premium_expiration_date: user.account.premium_expiration_date,
							premium_permanent: user.account.premium_permanent
						},
						created_at: user.created_at,
					}
				}
			});
		});

	})(req, res, next);

};