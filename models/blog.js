const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user", // now the created by is automatically pointing to the users
    },
  },
  { timestamps: true }
);

const Blog = model("blogs",blogSchema);

module.exports = { Blog };
