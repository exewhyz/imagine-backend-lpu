import { GoogleGenAI } from "@google/genai";

import { Image } from "../models/image.model.js";

import {v2 as cloudinary} from "cloudinary"
import saveImage from "../lib/cdn.js";

const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getAllImages = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login again",
      });
    }

    // const filtered = images.filter((image) => image.userId === Number(userId));
    const images = await Image.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: images,
      message: "Images fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error fetching all images: ${error.message}`,
    });
  }
};
export const generateImages = async (req, res) => {
  try {
    const { prompt } = req.body;

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login again",
      });
    }

    if (!prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: prompt.trim(),
    });

    const imageParts = response?.candidates[0]?.content?.parts;

    const inlineData = imageParts?.find((part) => part?.inlineData?.data);
    if (!inlineData) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate image",
      });
    }
    const data = inlineData?.inlineData?.data;

    // const imageUrl = `data:image/png;base64,${data}`;

    const buffer = Buffer.from(data, "base64");

    // console.log((buffer.length / 1024 / 1024).toFixed(2) + " MB");

    const savedImage = await saveImage(buffer);

    // const thumbnail = cloudinary.url(savedImage?.public_id,{
    //   width: 300,
    //   height:300,
    //   crop: "fill",
    //   quality: "auto",
    //   format: "webp"
    // })

    const image = {
      userId: userId,
      prompt: prompt.trim(),
      alt: prompt.trim().slice(0, 15),
      url: savedImage?.secure_url,
      public_id: savedImage?.public_id,
      // thumbnail
    };
    // images.push(image);
    await Image.create(image);

    res.status(201).json({
      success: true,
      data: image,
      message: "Images generated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error generating images: ${error}`,
    });
  }
};
