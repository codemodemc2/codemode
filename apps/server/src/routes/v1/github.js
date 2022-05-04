const { exec } = require("child_process");
const crypto = require("crypto");

module.exports = (router) => {
	router.post("/gitpush", (req, res) => {

		let sig_header = req.headers["x-hub-signature-256"];
		let secret = process.env.GITHUB_SECRET;

		let hash = crypto.createHmac("sha256", secret).update(JSON.stringify(req.body)).digest("hex");

		if (hash === sig_header) exec("sh ./pull_sh", (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
		});

		res.sendStatus(200);
	});

	return router;
};
