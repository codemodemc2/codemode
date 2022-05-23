const moduleAlias = require("module-alias");
moduleAlias.addAlias("@", __dirname + "/src/");
moduleAlias.addAlias("@config", __dirname + "/src/config/");
moduleAlias();
require("dotenv").config();
require("@/helpers/ensure_env");

const RedisService = require("@/services").RedisService;

(async () => await RedisService.connect())();

const redisClient = RedisService.client;

const process = require("process");

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster && process.env.NODE_ENV == "production") {
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker) => {
		console.log(`WORKER[${worker.process.pid}]: DEAD`);
		cluster.fork();
		console.log(`Spawned new worked: ${process.pid}`);
	});
} else {
	const express = require("express");
	const cors = require("cors");
	const helmet = require("helmet");
	const mongoose = require("mongoose");
	const session = require("express-session");
	const passport = require("passport");
	const bodyParser = require("body-parser");
	const requestIp = require("request-ip");
	const app = express();

	let environment = process.env.NODE_ENV;
	let isProduction = environment === "production";
	let isUsingNginx = process.env.NGINX_ENABLED === "true";

	if (isProduction) console.log("PRODUCTION ENVIROMENT");

	let RedisStore = require("connect-redis")(session);

	redisClient.on("error", function (error) {
		console.error(error);
	});

	let store = new RedisStore({ client: redisClient });

	let sess = {
		secret: process.env.COOKIE_SECRET,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 365,
		},
		resave: false,
		saveUninitialized: false,
		unset: "destroy",
		store: store,
	};

	if (isProduction) {
		if (isUsingNginx) app.set("trust proxy", 1);
		sess.cookie.secure = true;
	}

	app.use(session(sess));

	mongoose
		.connect(process.env.DBURL, {
			dbName: process.env.DBNAME,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log(`WORKER[${process.pid}]: database connected`))
		.catch((err) => console.log(err));

	require("@/helpers/passport")(passport);

	let corsOptions = {
		credentials: true,
	};

	if (isProduction) {
		let whitelist = process.env.FRONTEND_URL;
		whitelist = whitelist.split(",");
		corsOptions.origin = whitelist;
	}
	else { corsOptions.origin = ["http://localhost:5050", "http://localhost:3000"]; }

	app.use(cors(corsOptions));
	app.use(helmet());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(requestIp.mw());

	require("@/routes")(app);
	require("@/helpers/errors.js")(app);

	const port = process.env.PORT;

	app.listen(port, function () {
		console.log("Server running on port: " + port);
	});
}
