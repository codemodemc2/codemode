const Problem = require("@/database/models/problem.js");
const User = require("@/database/models/user.js");
const Company = require("@/database/models/company.js");
const { requireAuthenticated, requireAdmin } = require("@/helpers/auth.js");
const Mongoose = require("mongoose");

module.exports = (router) => {
	router.post("/problem", requireAdmin, async (req, res) => {

		let user = await User.findOne({ _id: req.user._id });
		console.log("user", user);

		const { title, content, has_deadline, deadline, prize } = req.body.data;

		let problem = new Problem({
			title,
			content,
			has_deadline,
			deadline,
			prize,
			created_by: user._id,
			company: Mongoose.Types.ObjectId(user.account.company_id)

		});

		console.log("problem", problem);

		problem.save((err, problem) => {
			if (err) {
				res.status(500).json({
					success: false,
					message: "Error creating problem",
				});
			} else {
				res.send({
					success: true,
					message: "Problem created",
					data: problem,
				});
			}
		});
	});

	router.get("/problems", requireAuthenticated, async (req, res) => {
		let user = await User.findOne({ _id: req.user._id });

		let problems = await Problem.find({ company: Mongoose.Types.ObjectId(user.account.company_id) }).populate("created_by", "username", User);

		res.send({
			success: true,
			data: problems,
		});
	});

	return router;
};
