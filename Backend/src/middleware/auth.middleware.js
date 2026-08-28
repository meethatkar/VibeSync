const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

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
