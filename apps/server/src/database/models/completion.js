const mongoose = require("mongoose");

const PromptSchema = new mongoose.Schema({
  prompt: String,
  engine_id: String,
  max_tokens: Number,
  stop: [String],
  temperature: Number,
  presence_penalty: Number,
  user_id: mongoose.Types.ObjectId,
  request_ip: String,
});

const ChoiceSchema = new mongoose.Schema({
  text: String,
  index: Number,
  finish_reason: String,
});

const ResponseSchema = new mongoose.Schema({
  id: String,
  object: String,
  created: Number,
  model: String,
  choices: [ChoiceSchema],
});

const CompletionSchema = new mongoose.Schema(
  {
    prompt: PromptSchema,
    response: ResponseSchema,
    accepted_answer: ChoiceSchema,
    user: mongoose.Types.ObjectId,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

CompletionSchema.index({ "$**": "text" });

const Completion = mongoose.model("completions", CompletionSchema);

module.exports = Completion;
