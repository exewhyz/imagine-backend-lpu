import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
cloudinary.config({
  cloud_name: "dkpila5fh",
  api_key: "525576432342115",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const saveImage = async (data) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "ai-generated-images",
          public_id: `img_${Date.now()}`,
          resource_type: "image",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        async (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        },
      );
      const readStream = streamifier.createReadStream(data);
      readStream.on("error", (error)=> console.log("read-stream-error",error));
      uploadStream.on("error", (error)=> console.log("upload-stream-error", error));

      readStream.pipe(uploadStream);
    });
    return result;
  } catch (error) {
    console.log(`Error uploading image to cloudinary: ${error}`);
  }
  // try {
  //   cloudinary.config({
  //     cloud_name: "dkpila5fh",
  //     api_key: "525576432342115",
  //     api_secret: process.env.CLOUDINARY_API_SECRET,
  //     timeout: 120000,
  //   });
  //   return await cloudinary.uploader
  //     .upload(data, {
  //       folder: "ai-generated-images",
  //       public_id: `img_${Date.now()}`,
  //       resource_type: "image",
  //     })
  //     .catch((err) => console.log(err));
  //   // return savedImage;
  // } catch (error) {
  //   console.log(`Error while saving image to cloudinary ${error.message}`);
  // }
};

export default saveImage;
