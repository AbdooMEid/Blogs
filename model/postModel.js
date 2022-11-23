const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdBy: [{ _id: String, email: String, role: String }],
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
