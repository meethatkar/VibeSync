const userModel = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistingModel = require("../models/blacklist.model");
const redis = require("../config/cache");

async function Register(req, res) {
  const { email, username, password } = req.body;

  const isEmailOrUsernameTaken = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isEmailOrUsernameTaken) {
    return res.status(409).json({
      message:
        isEmailOrUsernameTaken.email === email
          ? "email already exists, try to login"
          : "username is taken, try different one",
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
      username: user.username,
      user: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("jwt_secret", token, {
    /**
     * httpOnly: true
     * JavaScript cannot access the cookie (document.cookie won't see it).
     * Protects against XSS attacks.
     */
    httpOnly: true,
    // sameSite → Controls when the browser sends the cookie.
    sameSite: "none",
    /**
     * secure: true
     * Cookie is sent only over HTTPS.
     * Prevents sending the cookie over insecure HTTP.
     */
    secure: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "user registered",
    user,
  });
}

async function Login(req, res) {
  const { userInfo, password } = req.body;

  const isUserExists = await userModel
    .findOne({
      $or: [{ username: userInfo }, { email: userInfo }],
    })
    .select("+password");
  // Here done .select("+password"), as  be default password is not taken while fetching user
  // data, due to select: false property in schema, but due to this line ".select(+password)"
  // we can access password and it's send in return of fetched data.

  if (!isUserExists) {
    return res.status(400).json({
      message: "invalid Credentials",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    isUserExists.password,
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      username: isUserExists.username,
      userId: isUserExists._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("jwt_secret", token, {
    httpOnly: true,
    secure: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
    sameSite: "none",
  });

  res.status(201).json({
    message: "login success",
    user: {
      username: isUserExists.username,
      email: isUserExists.email,
    },
  });
}

async function getMe(req, res) {
  const userId = req.user.userId;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(400).json({
      message: "invalid creditianls",
    });
  }

  res.status(200).json({
    message: "user fetched",
    user,
  });
}

async function logout(req, res) {
  const token = req.cookies.jwt_secret;
  await redis.set(token, Date.now().toString()); //added token in redis, as (key,value) pair
  res.clearCookie("jwt_secret");

  res.status(201).json({
    message: "logout success",
  });
}

module.exports = {
  Register,
  Login,
  getMe,
  logout,
};
