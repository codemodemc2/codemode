let User = require("@/database/models/user.js");
let InviteLink = require("@/database/models/invite_link.js");
let { requireAdmin } = require("@/helpers/auth.js");
const { v4: uuidv4 } = require("uuid");

module.exports = (router) => {
	router.get('/admin/admins', requireAdmin, async (req, res) => {
		const page = req.query.page || 1;
		const perPage = req.query.perPage || 10;

		try {
			const users = await User.find({ 'account.company_id': req.user.account.company_id, is_admin: true }).skip(Number((perPage * page) - perPage)).limit(Number(perPage)).select('-password');

			const count = await User.find({ 'account.company_id': req.user.account.company_id, is_admin: true }).countDocuments();

			const pages = Math.ceil(count / perPage);
			if (page > pages) return res.status(404).send({ message: 'that_page_does_not_exist' });

			res.status(200).send({
				users,
				pages,
				perPage,
				count
			});

		} catch (error) {
			console.log(error);
			return res.status(500).send({ message: error });
		}
	});

	router.get('/admin/employees', requireAdmin, async (req, res) => {
		const page = req.query.page || 1;
		const perPage = req.query.perPage || 10;

		try {
			const users = await User.find({ 'account.company_id': req.user.account.company_id, is_admin: false }).skip(Number((perPage * page) - perPage)).limit(Number(perPage)).select('-password');

			const count = await User.find({ 'account.company_id': req.user.account.company_id, is_admin: false }).countDocuments();

			const pages = Math.ceil(count / perPage);
			if (page > pages) return res.status(404).send({ message: 'that_page_does_not_exist' });

			res.status(200).send({
				users,
				pages,
				perPage,
				count
			});

		} catch (error) {
			console.log(error);
			return res.status(500).send({ message: error });
		}
	});


	router.get('/admin/invite-links', requireAdmin, async (req, res) => {
		const page = req.query.page || 1;
		const perPage = req.query.perPage || 10;

		try {
			const links = await InviteLink.find({ 'account.company_id': req.user.account.company_id }).skip(Number((perPage * page) - perPage)).limit(Number(perPage)).populate('created_by', 'username email');

			const count = await InviteLink.find({ company_id: req.user.account.company_id }).countDocuments();

			const pages = Math.ceil(count / perPage);
			if (page > pages) return res.status(404).send({ message: 'that_page_does_not_exist' });

			res.status(200).send({
				links,
				pages,
				perPage,
				count
			});

		} catch (error) {
			console.log(error);
			return res.status(500).send({ message: error });
		}
	});


	router.get('/admin/user', requireAdmin, async (req, res, next) => {
		const id = req.query.id;

		try {

			let user = await User.find({ 'account.company_id': req.user.account.company_id, _id: id }).select('-password');
			if (!user) next({ status: 404, message: 'User with that ID does not exist' });


			res.status(200).send({
				user
			});

		} catch (error) {
			console.log(error);
			return res.status(500).send({ message: error });
		}
	});

	router.post('/admin/generate-invite-link', requireAdmin, async (req, res, next) => {
		let { unlimitedUsages, usages, expires, expiration, selectedRole } = req.body.data;
		try {


			let inviteLink = new InviteLink({
				id: uuidv4(),
				created_by: req.user._id,
				company_id: req.user.account.company_id,
				max_usages: unlimitedUsages ? -1 : usages,
				usages: 0,
				expiration: expires ? new Date(expiration) : null,
				permanent: !expires,
				type: selectedRole
			});
			await inviteLink.save();
			return res.send({ inviteLink: { id: inviteLink.id, _id: inviteLink._id } });
		} catch (error) {
			next({
				status: 500, message:
					"Something went wrong, please try again later"
			});
		}

	});


	return router;
};
