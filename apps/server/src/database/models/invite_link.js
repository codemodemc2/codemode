const mongoose = require("mongoose");

const InviteLinkSchema = new mongoose.Schema(
	{
		id: String,
		created_by: { type: mongoose.Types.ObjectId, ref: 'users' },
		company_id: mongoose.Types.ObjectId,
		max_usages: { type: Number, default: -1 },
		usages: { type: Number, default: 0 },
		expiration: Date,
		permanent: { type: Boolean, default: true },
		type: { type: Number, default: 0 } // 0 = user, 1 = admin
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const InviteLink = mongoose.model("invite_links", InviteLinkSchema);

module.exports = InviteLink;
