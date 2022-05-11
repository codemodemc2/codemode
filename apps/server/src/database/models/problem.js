const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		created_by: mongoose.Types.ObjectId,
		company: mongoose.Types.ObjectId,
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Problem = mongoose.model("problem", ProblemSchema);

ProblemSchema.index({ '$**': 'text' });

module.exports = Problem;

