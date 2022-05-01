const passport = require("passport");
const { generateHash, checkUser } = require("@/helpers/security");
const User = require("@/database/models/user");
const { requireAuthenticated } = require("@/helpers/auth");
const Mongoose = require("mongoose");

module.exports = (router) => {
	router.post("/login", (req, res, next) => {
		passport.authenticate("local-signin", (err, user, info) => {
			if (err) return next(err);
			if (info) return next(info);
			if (!user) return res.status(401).send({ message: "try_again" });

			req.logIn(user, async (err) => {
				if (err) {
					console.log(err);
					return next({ message: "something_went_wrong", status: 500 });
				}

				user.account.last_login_ip = req.clientIp;
				user.account.last_login_date = Date.now();

				await user.save();

				if (user.banned)
					return res.status(403).send({ message: "login_failed_banned" });

				return res.status(200).send({
					user: {
						session_expires_at: new Date(
							new Date().setHours(new Date().getHours() + 24)
						).getTime(),
						data: {
							email: user.email,
							is_admin: user.is_admin,
							username: user.username,
							account: {
								type: user.account.type,
								premium_expiration_date: user.account.premium_expiration_date,
								premium_permanent: user.account.premium_permanent,
							},
							created_at: user.created_at,
						},
					},
				});
			});
		})(req, res, next);
	});

	router.post("/register", (req, res, next) => {
		const { email, password, password2, username } = req.body;

		if (!email || !password || !password2 || !username) {
			res
				.status(403)
				.send(JSON.stringify({ message: "you_didnt_fill_all_fields" }));
			return;
		}

		if (password !== password2) {
			res.status(403).send(JSON.stringify({ message: "passwords_dont_match" }));
			return;
		}

		if (password.length < 6) {
			res
				.status(403)
				.send(
					JSON.stringify({ message: "password_must_be_at_least_6_chars_long" })
				);
			return;
		}

		passport.authenticate("local-signup", async (err, user, info) => {
			if (err) return next(err);
			if (info) return next(info);
			if (!user) return res.status(403).send({ message: "try_again" });

			user.account.last_login_date = Date.now();
			user.account.registration_ip = req.clientIp;
			user.username = username;

			await user.save();

			req.logIn(user, (err) => {
				if (err) {
					console.log(err);
					return next({ message: "something_went_wrong", status: 500 });
				}
				return res.status(200).send({
					user: {
						session_expires_at: new Date(
							new Date().setHours(new Date().getHours() + 24)
						).getTime(),
						data: {
							email: user.email,
							is_admin: user.is_admin,
							username: user.username,
							account: {
								type: user.account.type,
								premium_expiration_date: user.account.premium_expiration_date,
								premium_permanent: user.account.premium_permanent,
							},
							created_at: user.created_at,
						},
					},
				});
			});
		})(req, res, next);
	});

	router.post(
		"/account/change-password",
		requireAuthenticated,
		async (req, res) => {
			const { oldPass, newPass1, newPass2 } = req.body;
			if (!oldPass || !newPass1 || !newPass2) {
				return res
					.status(401)
					.send(JSON.stringify({ message: "you_didnt_fill_all_fields" }));
			}
			if (newPass1 !== newPass2) {
				return res
					.status(401)
					.send(JSON.stringify({ message: "passwords_dont_match" }));
			}

			if (newPass1.length < 6) {
				return res
					.status(401)
					.send(
						JSON.stringify({
							message: "password_must_be_at_least_6_chars_long",
						})
					);
			}
			if (newPass1.length > 128) {
				return res
					.status(401)
					.send(
						JSON.stringify({
							message: "password_must_be_shorter_than_128_chars",
						})
					);
			}

			let user = await User.findOne({
				email: Mongoose.sanitizeFilter(req.user.email),
			}).exec();
			if (!user)
				return res.status(500).send({ message: "password_change_fail" });

			try {
				let match = await checkUser(oldPass, req.user.password);
				if (!match)
					return res.status(401).send({ message: "old_password_wrong" });
			} catch (error) {
				console.log(error);
				return res.status(500).send({ message: "password_change_fail" });
			}

			try {
				let hash = await generateHash(newPass1);
				user.password = hash;
				await user.save();
				return res.send({ message: "password_change_sucess" });
			} catch (error) {
				console.log(error);
				return res.status(500).send({ message: "password_change_fail" });
			}
		}
	);

	router.post(
		"/account/change-email",
		requireAuthenticated,
		async (req, res) => {
			const { newEmail } = req.body;
			if (!newEmail) {
				return res
					.status(401)
					.send(JSON.stringify({ message: "you_didnt_fill_all_fields" }));
			}

			try {
				let user = await User.findOne({
					email: Mongoose.sanitizeFilter(req.user.email),
				}).exec();
				if (!user)
					return res.status(401).send({ message: "email_change_fail" });
				user.email = newEmail;
				await user.save();
				return res.send({ message: "email_change_sucess", email: newEmail });
			} catch (error) {
				console.log(error);
				return res.status(500).send({ message: "something_went_wrong" });
			}
		}
	);

	router.post(
		"/account/change-username",
		requireAuthenticated,
		async (req, res) => {
			const { newUsername } = req.body;
			if (!newUsername) {
				return res
					.status(401)
					.send(JSON.stringify({ message: "you_didnt_fill_all_fields" }));
			}

			try {
				let user = await User.findOne({
					email: Mongoose.sanitizeFilter(req.user.email),
				}).exec();
				if (!user)
					return res.status(401).send({ message: "username_change_fail" });
				user.username = newUsername;
				await user.save();
				return res.send({
					message: "username_change_sucess",
					username: newUsername,
				});
			} catch (error) {
				console.log(error);
				return res.status(500).send({ message: "something_went_wrong" });
			}
		}
	);

	router.post("/logout", requireAuthenticated, (req, res) => {
		req.logout();
		// req.session.cookie = {};
		// req.session.destroy(req.sessionID);
		// req.session = null;
		res.send({ message: "logged_out_successfully" });
	});

	return router;
};
