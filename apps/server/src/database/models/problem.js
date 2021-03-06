const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    created_by: mongoose.Types.ObjectId,
    company: mongoose.Types.ObjectId,
    has_deadline: Boolean,
    deadline: Date,
    prize: String,
    likes: [mongoose.Types.ObjectId],
    liked: Boolean,
    ideas: [mongoose.Types.ObjectId],
    idea_count: Number,
    like_count: Number,
		prize_image: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Problem = mongoose.model("problems", ProblemSchema);

ProblemSchema.index({ "$**": "text" });

module.exports = Problem;
