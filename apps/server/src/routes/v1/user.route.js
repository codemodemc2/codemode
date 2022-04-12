
module.exports = (router) => {

	router.get('/ok', (req, res) => {
		res.sendStatus(200);
	});

	return router;
};