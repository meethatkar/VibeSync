const Redis = require("ioredis").default; //use .default() so we'll get suggestions for imports
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("REDIS CONNECTED");
});

redis.on("error", (err) => {
  console.log("REDIS CONNECTION ERROR: ", err);
});

module.exports = redis;
