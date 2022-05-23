let User = require("@/database/models/user");
let Idea = require("@/database/models/idea");

module.exports = (router) => {
	router.get("/frontpage-leaderboard", async (req, res) => {

		let ideas = await Idea.find({});

		let users = await User.find({ company: req.user.account.company_id }).select("-password");

		users.forEach(user => {
			let userIdeas = ideas.filter(idea => String(idea.created_by) == String(user._id));
			let likes = 0;
			userIdeas.forEach(idea => {
				likes += idea.likes.length;
			});
			user.likes = likes;
		});

		// sort users by likes
		users.sort((a, b) => {
			return b.likes - a.likes;
		});

		// send only first 3 users
		res.send(users.slice(0, 3));


	});

	return router;
};
