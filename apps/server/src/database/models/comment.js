const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    created_by: mongoose.Types.ObjectId,
    likes: [mongoose.Types.ObjectId],
    liked: Boolean,
    like_count: Number,
    content: String,
    level: Number,
    parent: mongoose.Types.ObjectId,
    children: [mongoose.Types.ObjectId],
    company: mongoose.Types.ObjectId,
    children_objects: [Object],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Comment = mongoose.model("comments", CommentSchema);

module.exports = Comment;
