import { Schema, model } from "mongoose";

const imageSchema = new Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "ai-image",
    },
    url: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Image = model("Image", imageSchema);
