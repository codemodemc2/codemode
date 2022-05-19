const mongoose = require("mongoose");
const AccountDataSchema = new mongoose.Schema({
	email_verified: {
		type: Boolean,
		default: false,
	},
	registration_ip: {
		type: String,
		required: false,
		default: "",
	},
	last_login_ip: {
		type: String,
		required: false,
		default: "",
	},
	last_login_date: {
		type: Date,
		required: false,
		default: null,
	},
	company_id: {
		type: mongoose.Types.ObjectId,
		required: false,
		default: null,
	},
});

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: false,
			unique: false,
		},
		email: {
			type: String,
			required: true,
		},
		true_email: {
			type: String,
			required: false,
			default: "",
		},
		password: {
			type: String,
			required: true,
		},
		is_admin: {
			type: Boolean,
			default: false,
			required: false,
		},
		protected: {
			type: Boolean,
			default: false,
			required: false,
		},
		banned: {
			type: Boolean,
			default: false,
			required: false,
		},
		account: {
			type: AccountDataSchema,
			required: true,
		},
		likes: {
			type: Number,
			default: 0,
		},
		points: {
			type: Number,
			default: 0,
		}
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// UserSchema.index({ '$**': 'text' });

const User = mongoose.model("users", UserSchema);

module.exports = User;
