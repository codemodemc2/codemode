const mongoose = require("mongoose");

const InviteLinkSchema = new mongoose.Schema(
  {
    id: String,
    created_by: mongoose.Types.ObjectId,
    company_id: mongoose.Types.ObjectId,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const InviteLink = mongoose.model("invite_link", InviteLinkSchema);

module.exports = InviteLink;
