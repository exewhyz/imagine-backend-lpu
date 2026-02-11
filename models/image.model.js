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
    public_id : {
      type: String,
      required : true
    },
    url: {
      type: String,
      required: true,
    },
    // thumbnail: {
    //   type: String,
    //   required: true,
    // },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Image = model("Image", imageSchema);
