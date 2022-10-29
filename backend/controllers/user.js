const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (err)
      return res.status(400).json({
        message: "Something went wrong",
        error: err,
      });

    if (user)
      return res.status(400).json({
        message: "User already exists",
      });

    const { firstName, lastName, email, password } = req.body;

    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
    });

    const token = jwt.sign({ _id: _user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    _user.save((err, user) => {
      if (err)
        return res.status(400).json({
          message: "Something went wrong",
          error: err,
        });
      if (user)
        return res.status(201).json({
          message: "User created successfully",
          token: token,
          expiresIn: 3600 * 1000,
          user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (err)
      return res.status(400).json({
        message: err,
      });

    if (user) {
      const isAuthenticated = await user.authenticate(req.body.password);
      if (isAuthenticated) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        const { _id, firstName, lastName, email } = user;

        // res.cookie("token", token, { expiresIn: "1h" });
        res.status(200).json({
          message: "User logged in successfully",
          token: token,
          expiresIn: 3600 * 1000,
          user: {
            _id: _id,
            firstName: firstName,
            lastName: lastName,
            email: email,
          },
        });
      } else {
        return res
          .status(401)
          .json({ message: "Password invalid / User not recognised." });
      }
    } else {
      return res.status(401).json({ message: "Something went wrong" });
    }
  });
};

exports.signout = (req, res) => {
  // res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully..!",
  });
};

exports.checkToken = (req, res) => {
  User.findById(req.user._id).exec(async (err, user) => {
    if (err)
      return res.status(400).json({
        error: err,
        message: "Something went wrong",
      });

    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const { _id, firstName, lastName, email } = user;

      res.status(200).json({
        message: "User logged in successfully",
        token: token,
        expiresIn: 3600 * 1000,
        user: {
          _id: _id,
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      });
    } else {
      return res
        .status(401)
        .json({ message: "Password invalid / User not recognised." });
    }
  });
};
