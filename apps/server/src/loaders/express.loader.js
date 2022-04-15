
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');
const requestIp = require('request-ip');
const express = require("express");
const { client: redisClient } = require("@/services").RedisService;

let RedisStore = require('connect-redis')(session);
let store = new RedisStore({ client: redisClient });

let { production: isProduction } = require("@/config");

let corsOptions = {
	credentials: true,
	origin: isProduction ? [''] : ['http://localhost:5000', 'http://localhost:3000'],
	exposedHeaders: ['site-object-hash']
};

let sess = {
	secret: process.env.COOKIE_SECRET,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 365
	},
	resave: false,
	saveUninitialized: false,
	unset: 'destroy',
	store: store,
};

module.exports = {
	load(app) {

		require('@/helpers/passport')(passport);
		app.use(session(sess));
		app.use(cors(corsOptions));
		app.use(helmet());
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(requestIp.mw());

		require("@/routes")(app);
		require("@/helpers/error_handler")(app);

	}
};