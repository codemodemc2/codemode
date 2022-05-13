const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		created_by: mongoose.Types.ObjectId,
		company: mongoose.Types.ObjectId,
		has_deadline: Boolean,
		deadline: Date,
		prize: String,
		likes: [mongoose.Types.ObjectId],
		liked: Boolean,
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Problem = mongoose.model("problem", ProblemSchema);

ProblemSchema.index({ '$**': 'text' });

module.exports = Problem;

