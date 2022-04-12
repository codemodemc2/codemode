module.exports = {
	production: process.env.NODE_ENV === 'production',
	Database: require('./db.config'),
};