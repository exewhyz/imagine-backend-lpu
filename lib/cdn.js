import { v2 as cloudinary } from "cloudinary";

const saveImage = async (data) => {
  cloudinary.config({
    cloud_name: "dkpila5fh",
    api_key: "525576432342115",
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const savedImage = await cloudinary.uploader.upload(data, {
      folder: "ai-generated-images",
      public_id: `img_${Date.now()}`,
      resource_type: "image",
    });
    return savedImage;
  } catch (error) {
    console.log(`Error while saving image to cloudinary ${error.message}`)
    throw new Error(`Error while saving image to cloudinary ${error.message}`)
  }
};

export default saveImage;
