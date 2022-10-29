const express = require("express");
const { requireSignin } = require("../controllers/middleware");
const { signin, signup, signout, checkToken } = require("../controllers/user");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", requireSignin, signout);
router.get("/auth", requireSignin, checkToken);

module.exports = router;