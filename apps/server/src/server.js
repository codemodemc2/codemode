const express = require("express");

const { load } = require("./loaders");

const createServer = () => {
	const app = express();
	load(app);
	return app;
};

module.exports = { createServer };