const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const _ = require("lodash");
//Used express Jwt to decode json web token

exports.signup = async (req, res) => {
  // console.log('REQ BODY ON SIGNUP', req.body);
  const { name, email, role, password } = req.body;

  let newUser = await new User({
    name,
    email,
    role,
    password,
  });

  const result = newUser.save((err, success) => {
    if (success) {
      return res.status(200).json({
        message: "Signup success! Please signin",
      });
    } else if (err.code == 11000) {
      console.log("SIGNUP ERROR", err);
      return res.status(422).json({
        error: "Email is already taken",
      });
    } else {
      return res.status(500).json({
        error: "Error occured please try again",
      });
    }
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Invalid Credentials!",
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Invalid Credentials!",
      });
    }
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { _id, name, email, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET, // req.user._id
});

exports.adminMiddleware = (req, res, next) => {
  User.findById({ _id: req.user._id }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(400).json({
        error: "Admin resource. Access denied.",
      });
    }

    req.profile = user;
    next();
  });
};
