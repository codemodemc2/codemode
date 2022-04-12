const mongoose = require('mongoose');
const { name: dbName, url: dbUrl } = require("@/config").Database;
module.exports = {
	async load() {
		await this.connect();
	},
	async connect() {
		await mongoose.connect(dbUrl, { dbName, useNewUrlParser: true, useUnifiedTopology: true });
		console.log(`WORKER[${process.pid}]: database connected`);
	}
};