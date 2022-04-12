const express = require('express');
const { getFiles } = require('@/helpers/files.js');

module.exports = async (app) => {
	const routes = await getFiles('routes');
	try {
		routes.forEach(async r => {
			const file = r.substring(7);
			if (file === 'index.js') return;
			const router = express.Router();
			const routeModule = require(require('path').join(__dirname, file));
			const temp = file.split('/');
			const path = '/' + temp.slice(0, temp.length - 1).join('/');
			app.use(path, routeModule(router));
		});
	} catch (error) {
		console.log(error);
	}
};
