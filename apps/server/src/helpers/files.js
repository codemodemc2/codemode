const fs = require('fs/promises');
const crypto = require('crypto');
const path = require('path');
const rootPath = path.dirname(require.main.filename) + '/src/';

async function getFiles(dir, files_) {
	files_ = files_ || [];
	let files = await fs.readdir(rootPath + dir);
	for (let i in files) {
		let name = dir + '/' + files[i];
		let s = await fs.stat(rootPath + name);
		if (s.isDirectory()) {
			files_ = await getFiles(name, files_);
		} else {
			files_.push(name);
		}
	}
	return files_;
}

const hashObject = (obj) => crypto.createHash('sha1').update(JSON.stringify(obj)).digest('hex');

module.exports = { getFiles, hashObject };
