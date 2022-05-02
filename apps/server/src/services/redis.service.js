const { createClient } = require("redis");

let redisClient = createClient({
  legacyMode: true,
  //password: process.env.REDIS_PASSWORD,
});

module.exports = {
  client: redisClient,
  async connect() {
    await redisClient.connect();
  },
};
