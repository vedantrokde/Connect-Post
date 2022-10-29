const Post = require("../models/post");

exports.fetchPosts = async (req, res) => {
  const { pageIndex, pageSize } = req.query;
  const postQuery = Post.find();
  let fetched;
  if (pageIndex && pageSize) {
    postQuery.skip(pageSize * pageIndex).limit(pageSize);
  }

  await postQuery
    .populate("createdBy", "_id firstName lastName email")
    .exec(async (err, posts) => {
      if (err)
        return res.status(400).json({
          message: "Something went wrong.",
          error: err,
        });
      if (posts) {
        fetched = posts;
        return Post.count().then((count) => {
          res.status(200).json({
            message: "Posts fetched successfully",
            posts: fetched,
            count: count,
          });
        });
      }
    });
};

exports.addPost = async (req, res) => {
  let url = "";
  if (req.file) {
    url =
      req.protocol +
      "://" +
      req.get("host") +
      "/public/images/" +
      req.file.filename;
  }

  const _post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url,
    createdBy: req.user._id,
  });

  await _post.save((err, post) => {
    if (err)
      return res.status(400).json({
        message: "Something went wrong.",
        error: err,
      });
    if (post) {
      return res.status(201).json({
        message: "New post added successfully",
        post: post,
      });
    }
  });
};

exports.updatePost = (req, res) => {
  const data = {
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
    imagePath: req.body.imagePath,
    createdBy: req.user._id,
  };

  if (req.file) {
    data["imagePath"] =
      req.protocol +
      "://" +
      req.get("host") +
      "/public/images/" +
      req.file.filename;
  }

  Post.findById(data._id).exec(async (err, post) => {
    if (err)
      return res.status(400).json({
        message: "Something went wrong.",
        error: err,
      });
    if (post) {
      if (post.createdBy.equals(data.createdBy)) {
        Post.findByIdAndUpdate(
          data._id,
          data,
          { new: true },
          await function (err, post) {
            if (err)
              return res.status(400).json({
                message: "Something went wrong.",
                error: err,
              });
            if (!post)
              return res.status(400).json({
                message: "Failed to update post.",
              });
            return res.status(200).json({
              message: "Post updated successfully",
              post: post,
            });
          }
        );
      } else {
        return res.status(401).json({
          message: "Unauthorised access.",
        });
      }
    } else {
      return res.status(400).json({
        message: "Post does not exist.",
      });
    }
  });
};

exports.deletePost = (req, res) => {
  Post.findById(req.params["id"]).exec(async (err, post) => {
    if (err)
      return res.status(400).json({
        message: "Something went wrong.",
        error: err,
      });
    if (post) {
      if (post.createdBy.equals(req.user._id)) {
        Post.findByIdAndDelete(
          req.params["id"],
          await function (err, post) {
            if (err)
              return res.status(400).json({
                message: "Something went wrong.",
                error: err,
              });
            if (!post)
              return res.status(400).json({
                message: "Failed to delete post.",
              });

            return res.status(200).json({
              message: "Post deleted successfully",
              post: post,
            });
          }
        );
      } else {
        return res.status(401).json({
          message: "Unauthorised access.",
        });
      }
    } else {
      return res.status(400).json({
        message: "Post does not exist.",
      });
    }
  });
};
