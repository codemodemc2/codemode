const expressLoader = require('./express.loader.js');
const redisService = require('@/services/redis.service');
const mongooseLoader = require('./mongoose.loader.js');

exports.load = (app) => {
	redisService.connect();
	mongooseLoader.load();
	expressLoader.load(app);
};