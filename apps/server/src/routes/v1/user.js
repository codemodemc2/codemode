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

	router.get('/user/ideas', requireAuthenticated, async (req, res, next) => {
		const id = req.query.id;
		try {
			let user = await User.findOne({ 'account.company_id': req.user.account.company_id, _id: id }).select('-password');
			if (!user) next({ status: 404, message: 'User with that ID does not exist' });

			let ideas = await Idea.find({ created_by: id });


			for (let idea of ideas) {
				idea.liked = idea.likes.includes(req.user._id);
				idea.like_count = idea.likes.length;

				idea.likes = undefined;

				let comment_count = await Comment.countDocuments({ parent: idea._id });
				idea.comment_count = comment_count;
			}

			res.status(200).send({
				ideas
			});

		} catch (error) {
			console.log(error);
			return res.status(500).send({ message: error });
		}
	});


	router.get('/user/comments', requireAuthenticated, async (req, res, next) => {
		const id = req.query.id;
		try {
			let user = await User.findOne({ 'account.company_id': req.user.account.company_id, _id: id }).select('-password');
			if (!user) next({ status: 404, message: 'User with that ID does not exist' });

			let comments = await Comment.find({ created_by: id });


			for (let comment of comments) {
				comment.liked = comment.likes.includes(req.user._id);
				comment.like_count = comment.likes.length;

				comment.likes = undefined;

				let comment_count = await Comment.countDocuments({ parent: comment._id });
				comment.comment_count = comment_count;
			}

			res.status(200).send({
				comments
			});

		} catch (error) {
			console.log(error);
			return res.status(500).send({ message: error });
		}
	});

	return router;
};
