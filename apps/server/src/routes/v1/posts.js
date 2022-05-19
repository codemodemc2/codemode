const Problem = require("@/database/models/problem.js");
const Idea = require("@/database/models/idea.js");
const User = require("@/database/models/user.js");
const Comment = require("@/database/models/comment.js");

const { requireAuthenticated, requireAdmin } = require("@/helpers/auth.js");
const Mongoose = require("mongoose");

module.exports = (router) => {
	router.post("/problem", requireAdmin, async (req, res) => {

		let user = req.user;

		const { title, content, deadlineEnabled, deadline, prize, summary } = req.body.data;

		let problem = new Problem({
			title,
			summary,
			content,
			has_deadline: Boolean(deadlineEnabled),
			deadline,
			prize,
			created_by: user._id,
			company: Mongoose.Types.ObjectId(user.account.company_id),

		});

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

	router.post("/idea", requireAuthenticated, async (req, res) => {

		let user = req.user;

		const { title, content, problemId } = req.body.data;

		let idea = new Idea({
			title,
			content,
			created_by: user._id,
			company: Mongoose.Types.ObjectId(user.account.company_id),
			problem: problemId
		});

		let problem = await Problem.findById(problemId);

		problem.ideas.push(idea._id);

		await problem.save();

		idea.save((err, problem) => {
			if (err) {
				res.status(500).json({
					success: false,
					message: "Error creating idea",
				});
			} else {
				res.send({
					success: true,
					message: "Idea created",
					data: problem,
				});
			}
		});
	});


	router.get("/problems", requireAuthenticated, async (req, res) => {
		let user = req.user;

		let problems = await Problem.find({ company: Mongoose.Types.ObjectId(user.account.company_id) }).populate("created_by", "username", User);

		problems = problems.map((problem) => {
			if (problem.likes.includes(user._id)) {
				problem.liked = true;
			} else {
				problem.liked = false;
			}
			problem.like_count = problem.likes.length;
			problem.idea_count = problem.ideas.length;

			return problem;
		});


		res.send({
			success: true,
			data: problems,
		});
	});


	router.get("/problem", requireAuthenticated, async (req, res, next) => {

		const _id = req.query.id;

		if (!_id) {
			return res.status(500).json({
				success: false,
				message: "No problem id provided",
			});
		}

		let problem = {};
		try {
			problem = await Problem.findOne({ _id: Mongoose.Types.ObjectId(_id) }).populate("created_by", "username", User);
		} catch (error) {
			return next({ status: 404, message: "Error finding problem" });
		}

		if (!problem) return next({ status: 404, message: "Problem with that id not found" });

		problem.liked = problem.likes.includes(req.user._id);
		problem.like_count = problem.likes.length;
		problem.idea_count = problem.ideas.length;

		problem.likes = undefined;

		res.send({
			success: true,
			problem
		});

	});

	router.get("/idea", requireAuthenticated, async (req, res, next) => {

		const _id = req.query.id;

		if (!_id) {
			return res.status(500).json({
				success: false,
				message: "No idea id provided",
			});
		}

		let idea = {};
		try {
			idea = await Idea.findById(_id).populate("created_by", "username", User).populate("problem", Problem);
		} catch (error) {
			return next({ status: 404, message: "Error finding idea" });
		}

		if (!idea) return next({ status: 404, message: "Idea with that id not found" });

		idea.liked = idea.likes.includes(req.user._id);
		idea.like_count = idea.likes.length;

		idea.likes = undefined;

		let comment_count = await Comment.countDocuments({ parent: idea._id });
		idea.comment_count = comment_count;

		res.send({
			success: true,
			idea
		});

	});

	router.post("/like-problem", requireAuthenticated, async (req, res) => {

		const { id: _id, state } = req.body;

		if (!_id || typeof (state) == "undefined") {
			console.log(_id, state);
			return res.status(400).json({
				success: false,
				message: "Missing required fields",
			});
		}

		let problem = await Problem.findOne({ _id: Mongoose.Types.ObjectId(_id) });

		if (state == 1) {
			if (!problem.likes.includes(req.user._id)) {
				problem.likes.push(req.user._id);
			}
		} else {
			if (problem.likes.includes(req.user._id)) {
				problem.likes.splice(problem.likes.indexOf(req.user._id), 1);
			}
		}

		await problem.save();

		res.send({
			success: true,
			likes: problem.likes.length,
		});
	});



	router.post("/like-idea", requireAuthenticated, async (req, res) => {

		const { id: _id, state } = req.body;

		if (!_id || typeof (state) == "undefined") {
			console.log(_id, state);
			return res.status(400).json({
				success: false,
				message: "Missing required fields",
			});
		}

		let idea = await Idea.findOne({ _id: Mongoose.Types.ObjectId(_id) });

		if (state == 1) {
			if (!idea.likes.includes(req.user._id)) {
				idea.likes.push(req.user._id);
			}
		} else {
			if (idea.likes.includes(req.user._id)) {
				idea.likes.splice(idea.likes.indexOf(req.user._id), 1);
			}
		}

		await idea.save();

		res.send({
			success: true,
			likes: idea.likes.length,
		});
	});

	router.get("/top-ideas", async (req, res, next) => {

		let problemId = req.query.id;

		if (!problemId) {
			return next({ status: 400, message: "No problem id provided" });
		}

		let problem = await Problem.findById(problemId);


		if (!problem) {
			return next({ status: 404, message: "Problem with that id not found" });
		}

		let topIdeas = await Idea.find({ problem: problem._id }).sort({ likes: -1 }).limit(3);

		let ideas = await Idea.find({ _id: { $in: topIdeas.map(i => i._id) } }).populate("created_by", "username", User);

		// map like_count to every idea

		ideas = ideas.map(idea => {
			idea.like_count = idea.likes.length;
			idea.likes = undefined;
			return idea;
		});



		res.send({
			success: true,
			ideas,
		});
	});

	return router;
};
