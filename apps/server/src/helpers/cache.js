const { createClient } = require("redis");
const client = createClient({
  legacyMode: true,
  password: process.env.REDIS_PASSWORD,
});
(async () => await client.connect())();

exports.memoize = (func, duration, optionalKey) => {
  return (...args) => {
    let key = optionalKey
      ? optionalKey
      : `FUNCTION_CACHE_${func.name}_${JSON.stringify(args)}`;
    return new Promise(async (resolve, reject) => {
      let cached = await client.get(key);

      if (cached) {
        resolve(JSON.parse(cached));
      } else {
        if (func instanceof Promise) {
          func(...args).then((result) => {
            client.setex(key, duration, JSON.stringify(result));
            resolve(result);
          });
        } else {
          let result = func(...args);
          client.setex(key, duration, JSON.stringify(result));
          resolve(result);
        }
      }
    });
  };
};

exports.cache = (duration, optionalKey) => {
  return async (req, res, next) => {
    let key = optionalKey
      ? optionalKey
      : `ROUTE_CACHE_${req.url}_${JSON.stringify(req.body)}_${JSON.stringify(
          req.params
        )}`;
    let cache = await client.get(key);
    if (cache) {
      res.send(JSON.parse(cache));
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.setex(key, duration, JSON.stringify(body));
        res.sendResponse(body);
      };
      next();
    }
  };
};
