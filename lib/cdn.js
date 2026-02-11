import { v2 as cloudinary } from "cloudinary";

const saveImage = async (data) => {
  cloudinary.config({
    cloud_name: "dkpila5fh",
    api_key: "525576432342115",
    api_secret: "<your_api_secret>", // Click 'View API Keys' above to copy your API secret
  });
  try {
    const savedImage = await cloudinary.uploader.upload(data, {
      folder: "ai-generated-images",
      public_id: Date.now(),
    });
    return savedImage;
  } catch (error) {
    console.log(`Error while saving image to cloudinary ${error.message}`)
    return error;
  }
};

export default saveImage;
