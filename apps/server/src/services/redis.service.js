const { createClient } = require("redis");

let config = {
  legacyMode: true,
};

if (process.env.NODE_ENV === "production")
  config.password = process.env.REDIS_PASSWORD;

let redisClient = createClient(config);

module.exports = {
  client: redisClient,
  async connect() {
    await redisClient.connect();
  },
};
