const passport = require("passport");
const User = require("@/database/models/user");
const { requireAuthenticated } = require("@/helpers/auth");
const InviteLink = require("@/database/models/invite_link");
const Mongoose = require("mongoose");
const Company = require("@/database/models/company.js");
const { v4: uuidv4 } = require("uuid");

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

	router.post("/register-admin", (req, res, next) => {
		const d = req.body.data;
		const username = d.steps[1].data.username;
		const first_name = d.steps[1].data.first_name;
		const last_name = d.steps[1].data.last_name;
		const email = d.steps[1].data.email;
		const password = d.steps[2].data.password;
		const password2 = d.steps[2].data.repeatPassword;
		const companyName = d.steps[3].data.companyName;
		const inviteLinkId = d.steps[4].data.inviteLinkId;

		if (!email || !password || !password2 || !username || !companyName) {
			res
				.status(403)
				.send(JSON.stringify({ message: "you_didnt_fill_all_fields" }));
			return;
		}

		if (password !== password2) {
			res.status(403).send(JSON.stringify({ message: "passwords_dont_match" }));
			return;
		}

		if (password.length < 8) {
			res
				.status(403)
				.send(
					JSON.stringify({ message: "password_must_be_at_least_8_chars_long" })
				);
			return;
		}

		passport.authenticate("local-signup", async (err, user, info) => {
			if (err) return next(err);
			if (info) return next(info);
			if (!user) return res.status(403).send({ message: "try_again" });

			const company = await new Company({
				name: companyName,
				created_by: user._id,
				users: [user._id],
				admins: [user._id],
			});
			await company.save();

			user.account.company_id = company._id;
			user.account.last_login_date = Date.now();
			user.account.registration_ip = req.clientIp;
			user.username = username;
			user.first_name = first_name;
			user.last_name = last_name;
			user.is_admin = true;
			await user.save();

			if (inviteLinkId) {
				const inviteLink = await InviteLink.findOne({
					_id: Mongoose.Types.ObjectId(inviteLinkId),
				});
				inviteLink.created_by = user._id;
				inviteLink.company_id = company._id;
				await inviteLink.save();
				company.invite_links = [inviteLinkId];
				await company.save();
			}

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
							created_at: user.created_at,
						},
					},
				});
			});
		})(req, res, next);
	});

	router.post("/register-user", (req, res, next) => {
		const d = req.body.data;
		const username = d.steps[1].data.username;
		const first_name = d.steps[1].data.first_name;
		const last_name = d.steps[1].data.last_name;
		const email = d.steps[1].data.email;
		const password = d.steps[2].data.password;
		const password2 = d.steps[2].data.repeatPassword;
		const company_id = d.company._id;
		const inviteCode = d.inviteCode;

		if (!email || !password || !password2 || !username || !first_name || !last_name) {
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

			try {
				const inviteLink = await InviteLink.findOne({ id: inviteCode });
				if (inviteLink.type == 1) user.is_admin = true;
				inviteLink.usages += 1;
				await inviteLink.save();
			} catch (error) {
				console.log(error);
			}

			user.account.last_login_date = Date.now();
			user.account.registration_ip = req.clientIp;
			user.account.company_id = company_id;
			user.username = username;
			user.first_name = first_name;
			user.last_name = last_name;

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
							created_at: user.created_at,
						},
					},
				});
			});
		})(req, res, next);
	});

	router.post("/check-user-exists", (req, res, next) => {
		const { email } = req.body;

		if (!email) {
			res.status(422).send({ message: "you_didnt_fill_all_fields" });
			return;
		}

		User.findOne({ email }, (err, user) => {
			if (err) return next(err);
			if (user) {
				if (user.email === email) {
					res.status(403).send({ message: "email_already_exists" });
					return;
				}
			}
			res.status(200).send({ message: "user_is_available" });
		});
	});

	router.get("/invite-link", async (req, res) => {
		let inviteLink = new InviteLink({ id: uuidv4() });
		await inviteLink.save();
		return res.send({ inviteLink: { id: inviteLink.id, _id: inviteLink._id } });
	});

	router.post("/check-invite", async (req, res, next) => {
		const { id } = req.body;
		let inviteLink = await InviteLink.findOne({ id });
		let company = await Company.findById(inviteLink.company_id).select(
			"name _id"
		);
		if (!inviteLink) return next({ message: "invite_not_found" });
		if ((inviteLink.usages >= inviteLink.max_usages) && inviteLink.max_usages != -1) return next({ message: "Invite link is invalid", status: 500 });
		return res.send({ message: "invite_link_found", data: { company } });
	});



	router.post("/logout", requireAuthenticated, (req, res) => {
		req.logout();
		// req.session.cookie = {};
		// req.session.destroy(req.sessionID);
		// req.session = null;
		res.send({ message: "logged_out_successfully" });
	});



	return router;
};
