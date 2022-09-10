// const expressAsyncHandler = require("express-async-handler");
// const res = require("express/lib/response");
// const User = require("../models/userModel");
// const generateToken = require("../config/generateToken");
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";
import generateToken from "../config/generateToken";

const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, refCode, password, number, pic } = req.body;

  if (!email || !refCode || !password) {
    res.status(400);
    throw new Error("Please Enter All The Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    email,
    refCode,
    password,
    number,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      refCode: user.refCode,
      number: user.number,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the User");
  }
});

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      refCode: user.refCode,
      number: user.number,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email and Password");
  }
});

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { email: { $regex: req.query.search, $options: "i" } },
          // { name: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

export { registerUser, authUser, allUsers };
