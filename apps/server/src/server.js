const express = require("express");

const loaders = require("./loaders");

const createServer = () => {
	const app = express();
	loaders.load(app);
	return app;
};

module.exports = { createServer };