const { generateHash, checkUser } = require("@/helpers/security");
const User = require("@/database/models/user");
const { requireAuthenticated } = require("@/helpers/auth");
const Mongoose = require("mongoose");

module.exports = (router) => {
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
				return res.status(401).send(
					JSON.stringify({
						message: "password_must_be_at_least_6_chars_long",
					})
				);
			}
			if (newPass1.length > 128) {
				return res.status(401).send(
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


	return router;
};
