const userModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

const Register = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message:
        isUserExists.email === email
          ? "email is already registered, try to login"
          : "username is already taken, try another one",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    maxAge: 3 * 24 * 60 * 60 * 1000,
    secure: true,
  });

  res.status(201).json({
    message: "user registered",
    user: {
      username,
      email,
      _id: user._id,
    },
  });
};

const Login = async (req, res) => {
  const { userInfo, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ username: userInfo }, { email: userInfo }],
    })
    .select("+password");

  if (!user) {
    return res.status(400).json({
      message: "invalid creditianls",
    });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(400).json({
      message: "invalid creditianls",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "user logged In",
    user: {
      username: user.username,
      email: user.email,
      _id: user._id,
    },
  });
};

const getMe = async (req, res) => {
  const userId = req.user.userId;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  return res.status(200).json({
    message: "user details fetched",
    user,
  });
};

const Logout = async (req, res) => {
  const token = req.cookies.token;

  await redis.set(token, Date.now().toString());

  res.clearCookie("token");

  res.status(201).json({
    message: "user logged out",
  });
};

module.exports = {
  Register,
  Login,
  getMe,
  Logout,
};
