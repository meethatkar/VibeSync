/*
  STEPS:-
    !. write method
    2. extract token from cookies
    3. verify it with jwt (import needed)
    4. wrap it with tryCatch
    5. set req.user
    6. return with next()
*/

const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");
const tokenBlacklistModel = require("../models/blacklist.model");

async function verfiyUser(req, res, next) {
  const token = req.cookies.jwt_secret;

  if (!token) {
    return res.status(404).json({
      message: "token not provided",
    });
  }

  const isTokenBlacklist = await redis.get(token);

  if (isTokenBlacklist) {
    return res.status(401).json({
      message: "token is blacklisted",
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log("Error occured: ", err);
    return res.status(400).json({
      message: "error occured, unauthorized access",
    });
  }

  req.user = decoded;
  next();
}

module.exports = verfiyUser;
