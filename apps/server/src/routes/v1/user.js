const User = require("@/database/models/user");
const { requireAuthenticated } = require("@/helpers/auth");
const Comment = require("@/database/models/comment.js");
const Idea = require("@/database/models/idea.js");

module.exports = (router) => {

	router.get('/user', requireAuthenticated, async (req, res, next) => {
		const id = req.query.id;
		try {
			let user = await User.findOne({ 'account.company_id': req.user.account.company_id, _id: id }).select('-password');
			if (!user) next({ status: 404, message: 'User with that ID does not exist' });

			let post_count = await Idea.find({ created_by: id }).countDocuments();
			let comment_count = await Comment.find({ created_by: id }).countDocuments();

			user.post_count = post_count;
			user.comment_count = comment_count;

			res.status(200).send({
				user
			});

		} catch (error) {
			console.log(error);
			return res.status(500).send({ message: error });
		}
	});


	return router;
};
