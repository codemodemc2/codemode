const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
	{
		name: String,
		created_by: mongoose.Types.ObjectId,
		invite_links: [mongoose.Types.ObjectId],
		admins: [mongoose.Types.ObjectId],
		users: [mongoose.Types.ObjectId],
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);


const Company = mongoose.model("company", CompanySchema);

module.exports = Company;
