const express = require("express");
const { requireSignin, upload } = require("../controllers/middleware");
const {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
} = require("../controllers/post");

const router = express.Router();

router.get("", fetchPosts);
router.post("", requireSignin, upload.single("image"), addPost);
router.put("", requireSignin, upload.single("image"), updatePost);
router.delete("/:id", requireSignin, deletePost);

module.exports = router;
