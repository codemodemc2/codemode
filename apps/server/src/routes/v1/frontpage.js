let User = require("@/database/models/user");
let Idea = require("@/database/models/idea");
let Comment = require("@/database/models/idea");

module.exports = (router) => {
	router.get("/frontpage-leaderboard", async (req, res) => {
		let ideas = await Idea.find({});

		let users = await User.find({
			'account.company_id': req.user.account.company_id,
			is_admin: false
		}).select("-password");

		let comments = await Comment.find({ created_by: req.user._id });

		users.forEach((user) => {
			let userIdeas = ideas.filter(
				(idea) => String(idea.created_by) == String(user._id)
			);
			let likes = 0;
			userIdeas.forEach((idea) => {
				likes += idea.likes.length;
			});
			user.likes = likes;
		});

		users.sort((a, b) => {
			return b.likes - a.likes;
		});

		res.send(users.slice(0, 3));
	});

	return router;
};
