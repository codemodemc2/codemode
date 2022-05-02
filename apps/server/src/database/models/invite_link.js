const mongoose = require("mongoose");

const InviteLinkSchema = new mongoose.Schema(
  {
    id: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);


const InviteLink = mongoose.model("invite_link", InviteLinkSchema);

module.exports = InviteLink;
