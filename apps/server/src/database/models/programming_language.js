const mongoose = require("mongoose");

const ProgrammingLangSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    pre: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    end_sequence: {
      type: [String],
      required: true,
    },
    icon_link: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ProgrammingLanguage = mongoose.model(
  "programming_languages",
  ProgrammingLangSchema
);

module.exports = ProgrammingLanguage;
