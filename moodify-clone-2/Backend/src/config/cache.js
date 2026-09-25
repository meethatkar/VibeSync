const Redis = require("ioredis").default;

const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", () => {
  console.log("Error in redis connection");
});

module.exports = redis;
