const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		created_by: mongoose.Types.ObjectId,
		company: mongoose.Types.ObjectId,
		likes: [mongoose.Types.ObjectId],
		won: Boolean,
		liked: Boolean,
		like_count: Number,
		problem: mongoose.Types.ObjectId,
		comment_count: Number,
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Idea = mongoose.model("ideas", IdeaSchema);

IdeaSchema.index({ '$**': 'text' });

module.exports = Idea;

