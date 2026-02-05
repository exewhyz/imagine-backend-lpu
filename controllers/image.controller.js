import { GoogleGenAI } from "@google/genai";

const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const images = [
  {
    id: 1,
    userId: 1,
    url: "https://images.unsplash.com/photo-1761839259488-2bdeeae794f5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    prompt: "Small town street",
    alt: "Small town street",
  },
];

export const getAllImages = (req, res) => {
  try {
    //TODO: get images from database
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

    res.status(201).json({
      success: true,
      data: response,
      message: "Images generated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error generating images: ${error}`,
    });
  }
};
