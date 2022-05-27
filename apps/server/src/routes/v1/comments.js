const Comment = require("@/database/models/comment.js");
const User = require("@/database/models/user.js");

const Mongoose = require("mongoose");

module.exports = (router) => {
  router.post("/comment", async (req, res, next) => {
    let { content, level, parent } = req.body.data;
    let user = req.user;
    let comment = new Comment({
      content,
      level,
      parent,
      created_by: user._id,
      company: Mongoose.Types.ObjectId(user.account.company_id),
    });

    if (level > 0) {
      let p = await Comment.findById(parent);
      p.children.push(comment._id);
      await p.save();
    }

    try {
      await comment.save();
    } catch (error) {
      console.log(error);
      return next({
        status: 500,
        message: "Error creating comment",
      });
    }

    res.send({
      success: true,
      message: "Comment created",
      comment,
    });
  });

  router.get("/comments/:id", async (req, res, next) => {
    let { id } = req.params;

    try {
      let comments = await Comment.find({ parent: id }).populate(
        "created_by",
        "username",
        User
      );
      if (!comments)
        return next({ status: 404, message: "Comments not found" });

      for (let comment of comments) {
        comment.like_count = comment.likes.length;
        comment.liked = comment.likes.includes(req.user._id);
        comment.likes = undefined;

        if (comment.children.length > 0) {
          for (let child of comment.children) {
            let childComment = await Comment.findById(child).populate(
              "created_by",
              "username",
              User
            );
            comment.children_objects.push(childComment);
          }
        }

        for (let child of comment.children_objects) {
          child.like_count = child.likes.length;
          child.liked = child.likes.includes(req.user._id);
          child.likes = undefined;
        }
      }

      return res.send({
        success: true,
        comments,
      });
    } catch (error) {
      return next({ status: 500, message: "Error getting comments" });
    }
  });

  router.get("/comment/:id", async (req, res) => {
    let comment = await Comment.findById(req.params.id);
    res.send({
      success: true,
      comment,
    });
  });

  router.post("/like-comment", async (req, res, next) => {
    const { id: _id, state } = req.body;

    if (!_id || typeof state == "undefined")
      return next({ status: 400, message: "Missing required fields" });

    let comment = await Comment.findOne({ _id: Mongoose.Types.ObjectId(_id) });

    if (state == 1) {
      if (!comment.likes.includes(req.user._id)) {
        comment.likes.push(req.user._id);
      }
    } else {
      if (comment.likes.includes(req.user._id)) {
        comment.likes.splice(comment.likes.indexOf(req.user._id), 1);
      }
    }

    await comment.save();

    res.send({
      success: true,
      likes: comment.likes.length,
    });
  });

  return router;
};
